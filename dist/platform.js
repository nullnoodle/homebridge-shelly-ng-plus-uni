"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlatform = exports.CacheDeviceDiscoverer = exports.ConfigDeviceDiscoverer = exports.PLATFORM_NAME = exports.PLUGIN_NAME = void 0;
const shellies_ng_1 = require("shellies-ng");
const characteristics_1 = require("./utils/characteristics");
const services_1 = require("./utils/services");
const device_cache_1 = require("./utils/device-cache");
const device_delegates_1 = require("./device-delegates");
const config_1 = require("./config");
/**
 * The name of this plugin.
 */
exports.PLUGIN_NAME = 'homebridge-shelly-ng';
/**
 * The name of this homebridge platform.
 */
exports.PLATFORM_NAME = 'ShellyNG';
/**
 * Utility class that "discovers" devices from the configuration options.
 */
class ConfigDeviceDiscoverer extends shellies_ng_1.DeviceDiscoverer {
    /**
     * @param options - The platform configuration options.
     * @param emitInterval - The interval, in milliseconds, to wait between each emitted device.
     */
    constructor(options, emitInterval = 20) {
        super();
        this.options = options;
        this.emitInterval = emitInterval;
    }
    /**
     * Runs this discoverer.
     */
    async run() {
        // emit all devices that have a configured hostname
        for (const [id, opts] of this.options.deviceOptions) {
            if (opts.hostname) {
                await this.emitDevice({
                    deviceId: id,
                    hostname: opts.hostname,
                });
            }
        }
    }
    /**
     * Emits a device after the configured time interval has passed.
     */
    emitDevice(identifiers) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.handleDiscoveredDevice(identifiers);
                resolve();
            }, this.emitInterval);
        });
    }
}
exports.ConfigDeviceDiscoverer = ConfigDeviceDiscoverer;
/**
 * Utility class that "discovers" devices from a cache.
 */
class CacheDeviceDiscoverer extends shellies_ng_1.DeviceDiscoverer {
    /**
     * @param deviceCache - The cached devices.
     * @param emitInterval - The interval, in milliseconds, to wait between each emitted device.
     */
    constructor(deviceCache, emitInterval = 20) {
        super();
        this.deviceCache = deviceCache;
        this.emitInterval = emitInterval;
    }
    /**
     * Runs this discoverer.
     */
    async run() {
        // emit all cached devices
        for (const d of this.deviceCache) {
            await this.emitDevice({
                deviceId: d.id,
                hostname: d.hostname,
            });
        }
    }
    /**
     * Emits a device after the configured time interval has passed.
     */
    emitDevice(identifiers) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.handleDiscoveredDevice(identifiers);
                resolve();
            }, this.emitInterval);
        });
    }
}
exports.CacheDeviceDiscoverer = CacheDeviceDiscoverer;
/**
 * Implements a homebridge dynamic platform plugin.
 */
class ShellyPlatform {
    /**
     * This constructor is invoked by homebridge.
     * @param log - A logging device for this platform.
     * @param config - Configuration options for this platform.
     * @param api - A reference to the homebridge API.
     */
    constructor(log, config, api) {
        this.log = log;
        this.api = api;
        /**
         * Holds all platform accessories that were loaded from cache during launch,
         * as well as accessories that have been created since launch.
         */
        this.accessories = new Map();
        /**
         * Holds all device delegates.
         */
        this.deviceDelegates = new Map();
        // get the platform options
        this.options = new config_1.PlatformOptions(config);
        this.customCharacteristics = Object.freeze((0, characteristics_1.createCharacteristics)(api));
        this.customServices = Object.freeze((0, services_1.createServices)(api, this.customCharacteristics));
        // setup shellies-ng
        this.shellies = new shellies_ng_1.Shellies({
            websocket: { ...this.options.websocket, clientId: 'homebridge-shelly-ng-' + Math.round(Math.random() * 1000000) },
            autoLoadStatus: true,
            autoLoadConfig: true,
            deviceOptions: this.options.deviceOptions,
        });
        this.shellies
            .on('add', this.handleAddedDevice, this)
            .on('remove', this.handleRemovedDevice, this)
            .on('exclude', this.handleExcludedDevice, this)
            .on('unknown', this.handleUnknownDevice, this)
            .on('error', this.handleError, this);
        this.deviceCache = new device_cache_1.DeviceCache(api.user.storagePath(), log);
        // wait for homebridge to finish launching
        api.on('didFinishLaunching', this.initialize.bind(this));
    }
    /**
     * Configures cached accessories.
     * This method is invoked once for each cached accessory that is loaded during launch.
     */
    configureAccessory(accessory) {
        // store it for later
        this.accessories.set(accessory.UUID, accessory);
    }
    /**
     * Returns the platform accessory with the given UUID.
     * @param uuid - The UUID.
     */
    getAccessory(uuid) {
        return this.accessories.get(uuid);
    }
    /**
     * Adds one or more platform accessories to this platform.
     * This method will also register the accessories with homebridge.
     * @param accessories - The platform accessories to add.
     */
    addAccessory(...accessories) {
        if (accessories.length === 0) {
            return;
        }
        const accs = [];
        // add the accessories to our list
        for (const pa of accessories) {
            // skip if this accessory has already been added
            if (this.accessories.has(pa.UUID)) {
                continue;
            }
            this.accessories.set(pa.UUID, pa);
            accs.push(pa);
        }
        // register the accessories with homebridge
        this.api.registerPlatformAccessories(exports.PLUGIN_NAME, exports.PLATFORM_NAME, accs);
    }
    /**
     * Removes one or more platform accessories from this platform.
     * This method will also unregister the accessories from homebridge.
     * @param accessories - The platform accessories to remove.
     */
    removeAccessory(...accessories) {
        if (accessories.length === 0) {
            return;
        }
        // remove the accessories from our list
        for (const pa of accessories) {
            this.accessories.delete(pa.UUID);
        }
        // unregister the accessories from homebridge
        this.api.unregisterPlatformAccessories(exports.PLUGIN_NAME, exports.PLATFORM_NAME, accessories);
    }
    /**
     * Initializes this platform.
     */
    async initialize() {
        this.log.debug(this.accessories.size === 1
            ? 'Loaded 1 accessory from cache'
            : `Loaded ${this.accessories.size} accessories from cache`);
        await this.runConfigDeviceDiscoverer();
        // load cached devices
        try {
            await this.deviceCache.load();
        }
        catch (e) {
            this.log.error('Failed to load cached devices:', e instanceof Error ? e.message : e);
        }
        await this.runCacheDeviceDiscoverer();
        if (this.options.mdns.enable === true) {
            this.startMdnsDeviceDiscovery();
        }
        else {
            this.log.debug('mDNS device discovery disabled');
        }
    }
    /**
     * Discovers all devices found in the configuration.
     */
    runConfigDeviceDiscoverer() {
        // create a device discoverer
        const discoverer = new ConfigDeviceDiscoverer(this.options);
        // register it
        this.shellies.registerDiscoverer(discoverer);
        // run it
        return discoverer.run();
    }
    /**
     * Discovers all devices found in cache.
     */
    runCacheDeviceDiscoverer() {
        // create a device discoverer
        const discoverer = new CacheDeviceDiscoverer(this.deviceCache);
        // register it
        this.shellies.registerDiscoverer(discoverer);
        // run it
        return discoverer.run();
    }
    /**
     * Starts device discovery over mDNS.
     */
    async startMdnsDeviceDiscovery() {
        // create a device discoverer
        const discoverer = new shellies_ng_1.MdnsDeviceDiscoverer(this.options.mdns);
        // register it
        this.shellies.registerDiscoverer(discoverer);
        // log errors
        discoverer.on('error', (error) => {
            this.log.error('An error occurred in the mDNS device discovery service:', error.message);
            this.log.debug(error.stack || '');
        });
        try {
            // start the service
            await discoverer.start();
            this.log.info('mDNS device discovery started');
        }
        catch (e) {
            this.log.error('Failed to start the mDNS device discovery service:', e instanceof Error ? e.message : e);
            if (e instanceof Error && e.stack) {
                this.log.debug(e.stack);
            }
        }
    }
    /**
     * Handles 'add' events from the shellies-ng library.
     */
    async handleAddedDevice(device) {
        var _a, _b;
        // make sure this device hasn't already been added
        if (this.deviceDelegates.has(device.id)) {
            this.log.error(`Device with ID ${device.id} has already been added`);
            return;
        }
        // get the device delegate class for this device
        const cls = device_delegates_1.DeviceDelegate.getDelegate(device.model);
        if (cls === undefined) {
            // this is an unknown device
            this.handleUnknownDevice(device.id, device.model);
            return;
        }
        // get the configuration options for this device (and copy them)
        const opts = { ...this.options.getDeviceOptions(device.id) };
        // if no name has been specified...
        if (!opts.name) {
            // use the name from the API
            opts.name = (_b = (_a = device.system.config) === null || _a === void 0 ? void 0 : _a.device) === null || _b === void 0 ? void 0 : _b.name;
        }
        // create a delegate for this device
        const delegate = new cls(device, opts, this);
        // store the delegate
        this.deviceDelegates.set(device.id, delegate);
        // store info about this device in cache
        this.deviceCache.storeDevice(device);
    }
    /**
     * Handles 'remove' events from the shellies-ng library.
     */
    handleRemovedDevice(device) {
        var _a;
        // destroy and remove the device delegate
        (_a = this.deviceDelegates.get(device.id)) === null || _a === void 0 ? void 0 : _a.destroy();
        this.deviceDelegates.delete(device.id);
        // delete this device from cache
        this.deviceCache.delete(device.id);
    }
    /**
     * Handles 'exclude' events from the shellies-ng library.
     */
    handleExcludedDevice(deviceId) {
        var _a;
        this.log.info(`[${deviceId}] Device excluded`);
        // delete this device from cache
        this.deviceCache.delete(deviceId);
        if (this.deviceDelegates.has(deviceId)) {
            // destroy and remove the device delegate
            this.deviceDelegates.get(deviceId).destroy();
            this.deviceDelegates.delete(deviceId);
        }
        else {
            // find all of its platform accessories
            const pas = [];
            for (const pa of this.accessories.values()) {
                if (((_a = pa.context.device) === null || _a === void 0 ? void 0 : _a.id) === deviceId) {
                    pas.push(pa);
                }
            }
            // unregister them
            if (pas.length > 0) {
                this.api.unregisterPlatformAccessories(exports.PLUGIN_NAME, exports.PLATFORM_NAME, pas);
            }
            this.log.debug(pas.length === 1
                ? '1 platform accessory unregistered'
                : `${pas.length} platform accessories unregistered`);
        }
    }
    /**
     * Handles 'unknown' events from the shellies-ng library.
     */
    handleUnknownDevice(deviceId, model) {
        this.log.info(`[${deviceId}] Unknown device of model "${model}" discovered.`);
    }
    /**
     * Handles 'error' events from the shellies-ng library.
     */
    handleError(deviceId, error) {
        // print the error to the log
        this.log.error(error.message);
        this.log.debug(error.stack || '');
    }
}
exports.ShellyPlatform = ShellyPlatform;
//# sourceMappingURL=platform.js.map