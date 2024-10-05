"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceDelegate = void 0;
const abilities_1 = require("../abilities");
const accessory_1 = require("../accessory");
const device_logger_1 = require("../utils/device-logger");
/**
 * A DeviceDelegate manages accessories for a device.
 */
class DeviceDelegate {
    /**
     * @param device - The device to handle.
     * @param options - Configuration options for the device.
     * @param platform - A reference to the homebridge platform.
     */
    constructor(device, options, platform) {
        this.device = device;
        this.options = options;
        this.platform = platform;
        /**
         * Holds all accessories for this device.
         */
        this.accessories = new Map();
        this.log = new device_logger_1.DeviceLogger(device, options.name, platform.log);
        this.log.info('Device added');
        this.log.debug(device.rpcHandler.connected ? 'Device is connected' : 'Device is disconnected');
        this.connected = device.rpcHandler.connected;
        device.rpcHandler
            .on('connect', this.handleConnect, this)
            .on('disconnect', this.handleDisconnect, this)
            .on('request', this.handleRequest, this);
        this.setup();
    }
    /**
     * Registers a device delegate, so that it can later be found based on a device class or model
     * using the `DeviceDelegate.getDelegate()` method.
     * @param delegate - A subclass of `DeviceDelegate`.
     * @param deviceClasses - One or more subclasses of `Device`.
     */
    static registerDelegate(delegate, ...deviceClasses) {
        for (const deviceCls of deviceClasses) {
            const mdl = deviceCls.model.toUpperCase();
            // make sure it's not already registered
            if (DeviceDelegate.delegates.has(mdl)) {
                throw new Error(`A device delegate for ${deviceCls.model} has already been registered`);
            }
            // add it to the list
            DeviceDelegate.delegates.set(mdl, delegate);
        }
    }
    /**
     * Returns the device delegate for the given device class or model, if one has been registered.
     * @param deviceClsOrModel - The device class or model ID to lookup.
     */
    static getDelegate(deviceClsOrModel) {
        const mdl = typeof deviceClsOrModel === 'string' ? deviceClsOrModel : deviceClsOrModel.model;
        return DeviceDelegate.delegates.get(mdl.toUpperCase());
    }
    /**
     * Retrieves configuration options for the given component from the device options.
     * @param component - The component.
     * @returns A set of options, if found.
     */
    getComponentOptions(component) {
        var _a;
        return (_a = this.options) === null || _a === void 0 ? void 0 : _a[component.key];
    }
    /**
     * Creates an accessory with the given ID.
     * If a matching platform accessory is not found in cache, a new one will be created.
     * @param id - A unique identifier for this accessory.
     * @param nameSuffix - A string to append to the name of this accessory.
     * @param abilities - The abilities to add to this accessory.
     */
    createAccessory(id, nameSuffix, ...abilities) {
        // make sure the given ID is unique
        if (this.accessories.has(id)) {
            throw new Error(`An accessory with ID '${id}' already exists`);
        }
        let name = this.options.name || this.device.modelName;
        if (nameSuffix) {
            name += ' ' + nameSuffix;
        }
        // create an accessory
        const accessory = new accessory_1.Accessory(id, this.device.id, name, this.platform, this.log, new abilities_1.AccessoryInformationAbility(this.device), ...abilities);
        // store the accessory
        this.accessories.set(id, accessory);
        return accessory;
    }
    /**
     * Creates an accessory for a switch component.
     * @param swtch - The switch component to use.
     * @param opts - Options for the switch.
     */
    addSwitch(swtch, opts) {
        var _a;
        const o = opts !== null && opts !== void 0 ? opts : {};
        // get the config options for this switch
        const switchOpts = (_a = this.getComponentOptions(swtch)) !== null && _a !== void 0 ? _a : {};
        // determine the switch tyoe
        const type = typeof switchOpts.type === 'string' ? switchOpts.type.toLowerCase() : 'switch';
        const isOutlet = type === 'outlet';
        const id = o.single === true ? 'switch' : `switch-${swtch.id}`;
        const nameSuffix = o.single === true ? null : `Switch ${swtch.id + 1}`;
        return this.createAccessory(id, nameSuffix, new abilities_1.OutletAbility(swtch).setActive(isOutlet), new abilities_1.SwitchAbility(swtch).setActive(!isOutlet), 
        // use the apower property to determine whether power metering is available
        new abilities_1.PowerMeterAbility(swtch).setActive(swtch.apower !== undefined)).setActive(switchOpts.exclude !== true && o.active !== false);
    }
    /**
     * Creates an accessory for a cover component.
     * @param cover - The cover component to use.
     * @param opts - Options for the cover.
     */
    addCover(cover, opts) {
        var _a;
        const o = opts !== null && opts !== void 0 ? opts : {};
        // get the config options for this cover
        const coverOpts = (_a = this.getComponentOptions(cover)) !== null && _a !== void 0 ? _a : {};
        // determine the cover tyoe
        const type = typeof coverOpts.type === 'string' ? coverOpts.type.toLowerCase() : 'window';
        const isDoor = type === 'door';
        const isWindowCovering = type === 'windowcovering';
        return this.createAccessory('cover', 'Cover', new abilities_1.CoverAbility(cover, 'door').setActive(isDoor), new abilities_1.CoverAbility(cover, 'windowCovering').setActive(isWindowCovering), new abilities_1.CoverAbility(cover, 'window').setActive(!isDoor && !isWindowCovering), new abilities_1.PowerMeterAbility(cover)).setActive(coverOpts.exclude !== true && o.active !== false);
    }
    /**
     * Handles 'connect' events from the RPC handler.
     */
    handleConnect() {
        this.log.info('Device connected');
        this.connected = true;
    }
    /**
     * Handles 'disconnect' events from the RPC handler.
     */
    handleDisconnect(code, reason, reconnectIn) {
        const details = reason.length > 0 ? 'reason: ' + reason : 'code: ' + code;
        this.log.warn((this.connected ? 'Device disconnected' : 'Connection failed') + ' (' + details + ')');
        if (reconnectIn !== null) {
            let msg = 'Reconnecting in ';
            if (reconnectIn < 60 * 1000) {
                msg += Math.floor(reconnectIn / 1000) + ' second(s)';
            }
            else if (reconnectIn < 60 * 60 * 1000) {
                msg += Math.floor(reconnectIn / (60 * 1000)) + ' minute(s)';
            }
            else {
                msg += Math.floor(reconnectIn / (60 * 60 * 1000)) + ' hour(s)';
            }
            this.log.info(msg);
        }
        this.connected = false;
    }
    /**
     * Handles 'request' events from the RPC handler.
     */
    handleRequest(method) {
        this.log.debug('WebSocket:', method);
    }
    /**
     * Removes all event listeners from this device.
     */
    detach() {
        this.device.rpcHandler
            .off('connect', this.handleConnect, this)
            .off('disconnect', this.handleDisconnect, this)
            .off('request', this.handleRequest, this);
        // invoke detach() on all accessories
        for (const a of this.accessories.values()) {
            a.detach();
        }
    }
    /**
     * Destroys this device delegate, removing all event listeners and unregistering all accessories.
     */
    destroy() {
        this.detach();
        // find all platform accessories
        const pas = Array.from(this.accessories.values())
            .map(a => a.platformAccessory)
            .filter(a => a !== null);
        if (pas.length > 0) {
            // remove the accessories from the platform
            this.platform.removeAccessory(...pas);
        }
        this.log.info('Device removed');
    }
}
exports.DeviceDelegate = DeviceDelegate;
/**
 * Holds all registered delegates.
 */
DeviceDelegate.delegates = new Map();
//# sourceMappingURL=base.js.map