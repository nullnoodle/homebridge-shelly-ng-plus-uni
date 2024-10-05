import { Logger } from 'homebridge';
import { Device, DeviceId } from 'shellies-ng';
export interface CachedDeviceInfo {
    /**
     * Device ID.
     */
    id: DeviceId;
    /**
     * Device model.
     */
    model: string;
    /**
     * RPC handler protocol.
     */
    protocol: string;
    /**
     * The device's IP address or hostname.
     */
    hostname?: string;
}
export interface DeviceStorage {
    devices: CachedDeviceInfo[];
}
/**
 * Handles saving and loading device information to a cache file.
 */
export declare class DeviceCache {
    readonly log: Logger;
    /**
     * A path to the cache file.
     */
    readonly path: string;
    /**
     * Holds all devices loaded from the cache file.
     */
    protected devices: Map<string, CachedDeviceInfo>;
    private saveTimeout;
    /**
     * @param storagePath - A path to the directory that the devices will be stored in.
     * @param log - A logging device.
     */
    constructor(storagePath: string, log: Logger);
    /**
     * Loads cached devices.
     */
    load(): Promise<void>;
    /**
     * Saves the devices to cache.
     */
    save(): Promise<void>;
    /**
     * Saves the devices to cache after a short delay.
     * Multiple calls to this method within the delay will be debounced.
     */
    saveDelayed(): void;
    /**
     * Returns device info for the given device ID.
     */
    get(id: DeviceId): CachedDeviceInfo | undefined;
    /**
     * Stores the given device info.
     * @param d - The device info.
     * @param autoSave - Whether `saveDelayed()` should be automatically invoked.
     */
    set(d: CachedDeviceInfo, autoSave?: boolean): void;
    /**
     * Stores info about the given device in cache.
     * @param device - The device.
     * @param autoSave - Whether `saveDelayed()` should be automatically invoked.
     */
    storeDevice(device: Device, autoSave?: boolean): void;
    /**
     * Deletes info about the device with the given ID from cache.
     * @param id - The device ID.
     * @param autoSave - Whether `saveDelayed()` should be automatically invoked.
     */
    delete(id: DeviceId, autoSave?: boolean): void;
    /**
     * Returns a new Iterator object that contains each device.
     */
    [Symbol.iterator](): IterableIterator<CachedDeviceInfo>;
}
//# sourceMappingURL=device-cache.d.ts.map