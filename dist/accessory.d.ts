/// <reference types="node" />
import { DeviceId } from 'shellies-ng';
import { PlatformAccessory } from 'homebridge';
import { Ability } from './abilities';
import { DeviceLogger } from './utils/device-logger';
import { ShellyPlatform } from './platform';
export declare type AccessoryId = string;
export declare type AccessoryUuid = string;
/**
 * Represents a HomeKit accessory.
 */
export declare class Accessory {
    readonly id: AccessoryId;
    readonly deviceId: DeviceId;
    readonly name: string;
    readonly platform: ShellyPlatform;
    readonly log: DeviceLogger;
    /**
     * The UUID used to identify this accessory with HomeKit.
     */
    readonly uuid: AccessoryUuid;
    protected _platformAccessory: PlatformAccessory | null;
    /**
     * The underlying homebridge platform accessory.
     * This property will be `null` when the accessory is inactive.
     */
    get platformAccessory(): PlatformAccessory | null;
    /**
     * Holds this accessory's abilities.
     */
    readonly abilities: Ability[];
    private _active;
    /**
     * Whether this accessory is active.
     * Setting an accessory to inactive will remove it from HoneKit.
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * Timeout used to delay calls to `update()`.
     */
    protected updateTimeout: ReturnType<typeof setTimeout> | null;
    /**
     * @param id - The accessory ID.
     * @param deviceId - The associated device ID.
     * @param name - A user-friendly name of the accessory.
     * @param platform - A reference to the homebridge platform.
     * @param log - The logger to use.
     * @param abilities - The abilities that this accessory has.
     */
    constructor(id: AccessoryId, deviceId: DeviceId, name: string, platform: ShellyPlatform, log: DeviceLogger, ...abilities: Ability[]);
    /**
     * Sets `active` to the given value.
     * This method can be used when chaining calls, as it returns a reference to `this`.
     * @param value - Whether the accessory should be active.
     */
    setActive(value: boolean): this;
    /**
     * Updates this accessory based on whether it is active.
     */
    protected update(): void;
    /**
     * Activates this accessory, by creating a platform accessory and setting up all abilities.
     */
    protected activate(): void;
    /**
     * Deactivates this accessory, by destroying all abilities and the platform accessory.
     */
    protected deactivate(): void;
    /**
     * Creates a new platform accessory for this accessory.
     */
    protected createPlatformAccessory(): PlatformAccessory;
    /**
     * Removes all event listeners from this accessory.
     */
    detach(): void;
}
//# sourceMappingURL=accessory.d.ts.map