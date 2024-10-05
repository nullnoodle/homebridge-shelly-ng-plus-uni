import EventEmitter from 'eventemitter3';
import { ComponentLike, System } from '../components';
import { HttpService, KvsService, ScheduleService, ShellyService, WebhookService } from '../services';
import { RpcEventNotification, RpcHandler, RpcStatusNotification } from '../rpc';
export declare type DeviceId = string;
/**
 * Information about a device.
 */
export interface DeviceInfo {
    /**
     * The device ID.
     */
    id: DeviceId;
    /**
     * The MAC address of the device.
     */
    mac: string;
    /**
     * The model designation of the device.
     */
    model?: string;
    /**
     * Current firmware ID.
     */
    fw_id?: string;
    /**
     * Current firmware version.
     */
    ver?: string;
    /**
     * Current device profile.
     */
    profile?: string;
}
/**
 * Information about the firmware that a device is running.
 */
export interface DeviceFirmwareInfo {
    /**
     * The firmware ID.
     */
    id?: string;
    /**
     * The firmware version.
     */
    version?: string;
}
/**
 * Describes a device class and its static properties.
 */
export interface DeviceClass {
    new (info: DeviceInfo, rpcHandler: RpcHandler): Device;
    /**
     * The model designation of the device.
     */
    model: string;
    /**
     * A human-friendly name of the device model.
     */
    modelName: string;
}
/**
 * Property decorator used to label properties as components.
 * @param target - The prototype of the device class that the property belongs to.
 * @param propertyName - The name of the property.
 */
export declare const component: (target: any, propertyName: string) => void;
/**
 * Base class for all devices.
 */
export declare abstract class Device extends EventEmitter {
    readonly rpcHandler: RpcHandler;
    /**
     * Holds all registered subclasses.
     */
    private static readonly subclasses;
    /**
     * Registers a device class, so that it can later be found based on its device model
     * using the `Device.getClass()` method.
     * @param cls - A subclass of `Device`.
     */
    static registerClass(cls: DeviceClass): void;
    /**
     * Returns the device class for the given device model, if one has been registered.
     * @param model - The model designation to lookup.
     */
    static getClass(model: string): DeviceClass | undefined;
    /**
     * The ID of this device.
     */
    readonly id: DeviceId;
    /**
     * The MAC address of this device.
     */
    readonly macAddress: string;
    /**
     * Information about the firmware that the device is running.
     */
    readonly firmware: DeviceFirmwareInfo;
    /**
     * This device's Shelly service.
     */
    readonly shelly: ShellyService;
    /**
     * This device's Schedule service.
     */
    readonly schedule: ScheduleService;
    /**
     * This device's Webhook service.
     */
    readonly webhook: WebhookService;
    /**
     * This device's HTTP service.
     */
    readonly http: HttpService;
    /**
     * This device's KVS service.
     */
    readonly kvs: KvsService;
    readonly system: System;
    /**
     * @param info - Information about this device.
     * @param rpcHandler - Used to make remote procedure calls.
     */
    constructor(info: DeviceInfo, rpcHandler: RpcHandler);
    private _model;
    /**
     * The model designation of this device.
     */
    get model(): string;
    /**
     * A human-friendly name of the device model.
     */
    get modelName(): string;
    private _components;
    /**
     * Maps component keys to property names.
     */
    protected get components(): Map<string, string>;
    /**
     * Determines whether this device has a component with a given key.
     * @param key - The component key.
     */
    hasComponent(key: string): boolean;
    /**
     * Returns the component with the given key.
     * @param key - The component key.
     */
    getComponent(key: string): ComponentLike | undefined;
    /**
     * Returns a new Iterator object that contains each of the device's
     * components.
     */
    [Symbol.iterator](): IterableIterator<[string, ComponentLike]>;
    /**
     * Loads the status for all of the device's components and populates their characteristics.
     */
    loadStatus(): Promise<void>;
    /**
     * Loads the condiguration for all of the device's components and populates their `config` properties.
     */
    loadConfig(): Promise<void>;
    /**
     * Handles 'statusUpdate' events from our RPC handler.
     */
    protected statusUpdateHandler(update: RpcStatusNotification): void;
    /**
     * Handles 'event' events from our RPC handler.
     */
    protected eventHandler(events: RpcEventNotification): void;
}
/**
 * Base class for devices that have multiple profiles.
 */
export declare abstract class MultiProfileDevice extends Device {
    readonly rpcHandler: RpcHandler;
    /**
     * The current device profile.
     */
    readonly profile: string;
    /**
     * @param info - Information about this device.
     * @param rpcHandler - Used to make remote procedure calls.
     */
    constructor(info: DeviceInfo, rpcHandler: RpcHandler);
}
//# sourceMappingURL=base.d.ts.map