import { API, Characteristic, PlatformAccessory, Service, WithUUID } from 'homebridge';
import { CustomCharacteristics } from '../utils/characteristics';
import { CustomServices } from '../utils/services';
import { DeviceLogger } from '../utils/device-logger';
import { ShellyPlatform } from '../platform';
export declare type ServiceClass = WithUUID<typeof Service>;
/**
 * Base class for all abilities.
 * An ability is roughly equivalent to a HomeKit service.
 */
export declare abstract class Ability {
    protected readonly serviceName?: string | undefined;
    protected readonly serviceSubtype?: string | undefined;
    private _platformAccessory;
    /**
     * The associated platform accessory.
     */
    get platformAccessory(): PlatformAccessory;
    private _platform;
    /**
     * A reference to the platform.
     */
    protected get platform(): ShellyPlatform;
    /**
     * A reference to the homebridge API.
     */
    protected get api(): API;
    /**
     * Shorthand property.
     */
    protected get Characteristic(): typeof Characteristic;
    /**
     * Shorthand property.
     */
    protected get Service(): typeof Service;
    /**
     * Shorthand property.
     */
    protected get customCharacteristics(): CustomCharacteristics;
    /**
     * Shorthand property.
     */
    protected get customServices(): CustomServices;
    private _log;
    /**
     * The logging device to use.
     */
    protected get log(): DeviceLogger;
    private _service;
    /**
     * The HomeKit service that this ability uses.
     */
    protected get service(): Service;
    private _active;
    /**
     * Whether this ability is active.
     * Setting an ability to inactive will remove its HomeKit service.
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * @param serviceName - A name of the service.
     * @param serviceSubtype - A unique identifier for the service.
     */
    constructor(serviceName?: string | undefined, serviceSubtype?: string | undefined);
    /**
     * Sets up this ability.
     * This method is called by the parent accessory every time it becomes active.
     * @param platformAccessory - The homebridge platform accessory to use.
     * @param platform - A reference to the platform.
     * @param log - The logger to use.
     */
    setup(platformAccessory: PlatformAccessory, platform: ShellyPlatform, log: DeviceLogger): void;
    /**
     * Sets `active` to the given value.
     * This method can be used when chaining calls, as it returns a reference to `this`.
     * @param value - Whether the ability should be active.
     */
    setActive(value: boolean): this;
    /**
     * Determines whether this ability is active.
     * The default implementation simply returns the value of the `active` property.
     * Subclasses can override this method to add more conditions.
     */
    protected isActive(): boolean;
    /**
     * Updates this ability based on whether it is active.
     * If active, its service will be added and initialized.
     * If inactive, its service will be removed.
     */
    protected update(): void;
    /**
     * Returns a service for this ability.
     * If the platform accessory has a matching service, it will be returned. Otherwise, the service will be added.
     */
    protected addService(): Service;
    /**
     * Removes this ability's service from the platform accessory.
     */
    protected removeService(): void;
    /**
     * Helper method that removes a characteristic based on its class (Service.removeCharacteristic()
     * only accepts an instance).
     * @param characteristic - The characteristic to remove.
     */
    protected removeCharacteristic(characteristic: WithUUID<new () => Characteristic> & WithUUID<typeof Characteristic>): void;
    /**
     * Subclasses should implement this method to return the HomeKit service type to use.
     */
    protected abstract get serviceClass(): ServiceClass;
    /**
     * Subclasses should use this method to initialize the service and attach their event listeners.
     */
    protected abstract initialize(): any;
    /**
     * Subclasses should use this method to remove their event listeners.
     */
    abstract detach(): any;
    /**
     * Removes all event listeners and all references to the platform accessory.
     * This method is called by the parent accessory every time it becomes inactive.
     * Note that this method doesn't remove the service from the platform accessory as it is assumed that
     * the entire platform accessory is about to be unregistered and discarded.
     */
    destroy(): void;
}
//# sourceMappingURL=base.d.ts.map