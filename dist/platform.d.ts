import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig } from 'homebridge';
import { Device, DeviceDiscoverer, DeviceId, DeviceIdentifiers, Shellies } from 'shellies-ng';
import { CustomCharacteristics } from './utils/characteristics';
import { CustomServices } from './utils/services';
import { DeviceCache } from './utils/device-cache';
import { DeviceDelegate } from './device-delegates';
import { PlatformOptions } from './config';
declare type AccessoryUuid = string;
/**
 * The name of this plugin.
 */
export declare const PLUGIN_NAME = "homebridge-shelly-ng";
/**
 * The name of this homebridge platform.
 */
export declare const PLATFORM_NAME = "ShellyNG";
/**
 * Utility class that "discovers" devices from the configuration options.
 */
export declare class ConfigDeviceDiscoverer extends DeviceDiscoverer {
    readonly options: PlatformOptions;
    readonly emitInterval: number;
    /**
     * @param options - The platform configuration options.
     * @param emitInterval - The interval, in milliseconds, to wait between each emitted device.
     */
    constructor(options: PlatformOptions, emitInterval?: number);
    /**
     * Runs this discoverer.
     */
    run(): Promise<void>;
    /**
     * Emits a device after the configured time interval has passed.
     */
    protected emitDevice(identifiers: DeviceIdentifiers): Promise<void>;
}
/**
 * Utility class that "discovers" devices from a cache.
 */
export declare class CacheDeviceDiscoverer extends DeviceDiscoverer {
    readonly deviceCache: DeviceCache;
    readonly emitInterval: number;
    /**
     * @param deviceCache - The cached devices.
     * @param emitInterval - The interval, in milliseconds, to wait between each emitted device.
     */
    constructor(deviceCache: DeviceCache, emitInterval?: number);
    /**
     * Runs this discoverer.
     */
    run(): Promise<void>;
    /**
     * Emits a device after the configured time interval has passed.
     */
    protected emitDevice(identifiers: DeviceIdentifiers): Promise<void>;
}
/**
 * Implements a homebridge dynamic platform plugin.
 */
export declare class ShellyPlatform implements DynamicPlatformPlugin {
    readonly log: Logger;
    readonly api: API;
    /**
     * The configuration options for this platform.
     */
    readonly options: PlatformOptions;
    /**
     * A set of custom HomeKit characteristics.
     */
    readonly customCharacteristics: CustomCharacteristics;
    /**
     * A set of custom HomeKit services.
     */
    readonly customServices: CustomServices;
    /**
     * A reference to the shellies-ng library.
     */
    protected readonly shellies: Shellies;
    /**
     * Holds all platform accessories that were loaded from cache during launch,
     * as well as accessories that have been created since launch.
     */
    protected readonly accessories: Map<AccessoryUuid, PlatformAccessory>;
    /**
     * A reference to our cached devices.
     */
    readonly deviceCache: DeviceCache;
    /**
     * Holds all device delegates.
     */
    readonly deviceDelegates: Map<DeviceId, DeviceDelegate>;
    /**
     * This constructor is invoked by homebridge.
     * @param log - A logging device for this platform.
     * @param config - Configuration options for this platform.
     * @param api - A reference to the homebridge API.
     */
    constructor(log: Logger, config: PlatformConfig, api: API);
    /**
     * Configures cached accessories.
     * This method is invoked once for each cached accessory that is loaded during launch.
     */
    configureAccessory(accessory: PlatformAccessory): void;
    /**
     * Returns the platform accessory with the given UUID.
     * @param uuid - The UUID.
     */
    getAccessory(uuid: AccessoryUuid): PlatformAccessory | undefined;
    /**
     * Adds one or more platform accessories to this platform.
     * This method will also register the accessories with homebridge.
     * @param accessories - The platform accessories to add.
     */
    addAccessory(...accessories: PlatformAccessory[]): void;
    /**
     * Removes one or more platform accessories from this platform.
     * This method will also unregister the accessories from homebridge.
     * @param accessories - The platform accessories to remove.
     */
    removeAccessory(...accessories: PlatformAccessory[]): void;
    /**
     * Initializes this platform.
     */
    protected initialize(): Promise<void>;
    /**
     * Discovers all devices found in the configuration.
     */
    protected runConfigDeviceDiscoverer(): Promise<void>;
    /**
     * Discovers all devices found in cache.
     */
    protected runCacheDeviceDiscoverer(): Promise<void>;
    /**
     * Starts device discovery over mDNS.
     */
    protected startMdnsDeviceDiscovery(): Promise<void>;
    /**
     * Handles 'add' events from the shellies-ng library.
     */
    protected handleAddedDevice(device: Device): Promise<void>;
    /**
     * Handles 'remove' events from the shellies-ng library.
     */
    protected handleRemovedDevice(device: Device): void;
    /**
     * Handles 'exclude' events from the shellies-ng library.
     */
    protected handleExcludedDevice(deviceId: DeviceId): void;
    /**
     * Handles 'unknown' events from the shellies-ng library.
     */
    protected handleUnknownDevice(deviceId: DeviceId, model: string): void;
    /**
     * Handles 'error' events from the shellies-ng library.
     */
    protected handleError(deviceId: DeviceId, error: Error): void;
}
export {};
//# sourceMappingURL=platform.d.ts.map