import { ComponentLike, Cover, Device, Switch } from 'shellies-ng';
import { Ability } from '../abilities';
import { Accessory, AccessoryId } from '../accessory';
import { DeviceLogger } from '../utils/device-logger';
import { DeviceOptions } from '../config';
import { ShellyPlatform } from '../platform';
/**
 * Describes a device delegate class.
 */
export interface DeviceDelegateClass {
    new (device: Device, options: DeviceOptions, platform: ShellyPlatform): DeviceDelegate;
}
/**
 * Describes a device class.
 */
export interface DeviceClass {
    model: string;
}
export interface AddSwitchOptions {
    /**
     * Whether the accessory should be active.
     */
    active: boolean;
    /**
     * Whether the device has a single switch.
     */
    single: boolean;
}
export interface AddCoverOptions {
    /**
     * Whether the accessory should be active.
     */
    active: boolean;
}
/**
 * A DeviceDelegate manages accessories for a device.
 */
export declare abstract class DeviceDelegate {
    readonly device: Device;
    readonly options: DeviceOptions;
    readonly platform: ShellyPlatform;
    /**
     * Holds all registered delegates.
     */
    private static readonly delegates;
    /**
     * Registers a device delegate, so that it can later be found based on a device class or model
     * using the `DeviceDelegate.getDelegate()` method.
     * @param delegate - A subclass of `DeviceDelegate`.
     * @param deviceClasses - One or more subclasses of `Device`.
     */
    static registerDelegate(delegate: DeviceDelegateClass, ...deviceClasses: DeviceClass[]): void;
    /**
     * Returns the device delegate for the given device class or model, if one has been registered.
     * @param deviceClsOrModel - The device class or model ID to lookup.
     */
    static getDelegate(deviceClsOrModel: DeviceClass | string): DeviceDelegateClass | undefined;
    /**
     * Holds all accessories for this device.
     */
    protected readonly accessories: Map<AccessoryId, Accessory>;
    /**
     * Logger specific for this device.
     */
    readonly log: DeviceLogger;
    /**
     * Used to keep track of whether a connection had been established when the 'disconnect' event is emitted by our RPC handler.
     */
    protected connected: boolean;
    /**
     * @param device - The device to handle.
     * @param options - Configuration options for the device.
     * @param platform - A reference to the homebridge platform.
     */
    constructor(device: Device, options: DeviceOptions, platform: ShellyPlatform);
    /**
     * Subclasses should override this method to setup the device delegate and create their
     * accessories.
     */
    protected abstract setup(): any;
    /**
     * Retrieves configuration options for the given component from the device options.
     * @param component - The component.
     * @returns A set of options, if found.
     */
    protected getComponentOptions<T>(component: ComponentLike): T | undefined;
    /**
     * Creates an accessory with the given ID.
     * If a matching platform accessory is not found in cache, a new one will be created.
     * @param id - A unique identifier for this accessory.
     * @param nameSuffix - A string to append to the name of this accessory.
     * @param abilities - The abilities to add to this accessory.
     */
    protected createAccessory(id: AccessoryId, nameSuffix: string | null, ...abilities: Ability[]): Accessory;
    /**
     * Creates an accessory for a switch component.
     * @param swtch - The switch component to use.
     * @param opts - Options for the switch.
     */
    protected addSwitch(swtch: Switch, opts?: Partial<AddSwitchOptions>): Accessory;
    /**
     * Creates an accessory for a cover component.
     * @param cover - The cover component to use.
     * @param opts - Options for the cover.
     */
    protected addCover(cover: Cover, opts?: Partial<AddCoverOptions>): Accessory;
    /**
     * Handles 'connect' events from the RPC handler.
     */
    protected handleConnect(): void;
    /**
     * Handles 'disconnect' events from the RPC handler.
     */
    protected handleDisconnect(code: number, reason: string, reconnectIn: number | null): void;
    /**
     * Handles 'request' events from the RPC handler.
     */
    protected handleRequest(method: string): void;
    /**
     * Removes all event listeners from this device.
     */
    detach(): void;
    /**
     * Destroys this device delegate, removing all event listeners and unregistering all accessories.
     */
    destroy(): void;
}
//# sourceMappingURL=base.d.ts.map