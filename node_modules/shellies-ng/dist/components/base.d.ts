import EventEmitter from 'eventemitter3';
import { Device } from '../devices';
import { RpcEvent, RpcParams } from '../rpc';
export declare type PrimitiveTypes = boolean | number | string;
export declare type CharacteristicValue = PrimitiveTypes | PrimitiveTypes[] | null | {
    [key: string]: PrimitiveTypes | PrimitiveTypes[] | null;
};
/**
 * Interface used when passing around components, since the Component class is
 * generic.
 */
export interface ComponentLike {
    name: string;
    key: string;
    device: Device;
    update(data: Record<string, unknown>): any;
    handleEvent(event: RpcEvent): any;
}
/**
 * Property decorator used to label properties as characteristics.
 * @param target - The prototype of the component class that the property belongs to.
 * @param propertyName - The name of the property.
 */
export declare const characteristic: (target: any, propertyName: string) => void;
/**
 * Base class for all device components.
 */
export declare abstract class ComponentBase extends EventEmitter implements ComponentLike {
    readonly name: string;
    readonly device: Device;
    /**
     * The key used to identify the component in status updates etc.
     */
    readonly key: string;
    /**
     * @param name - The name of this component. Used when making RPCs.
     * @param device - The device that owns this component.
     * @param key - The key used to identify the component in status updates etc. If `null`, the component name
     * in lower case letters will be used.
     */
    constructor(name: string, device: Device, key?: string | null);
    private _characteristics;
    /**
     * A list of all characteristics.
     */
    protected get characteristics(): Set<string>;
    /**
     * Updates the characteristics of the component.
     * This method will emit `change` events for all characteristics that are
     * updated.
     * @param data - A data object that contains characteristics and their values.
     */
    update(data: Record<string | number | symbol, unknown>): void;
    /**
     * Handles events received from the device RPC handler.
     * Subclasses should override this method to handle their specific events.
     * @param event - The event that has occurred.
     */
    handleEvent(event: RpcEvent): void;
    /**
     * Shorthand method for making an RPC.
     */
    protected rpc<T>(method: string, params?: RpcParams): PromiseLike<T>;
}
/**
 * Defines the default response from a component's SetConfig RPC method.
 */
export interface DefaultConfigResponse {
    restart_required: boolean;
}
/**
 * Defines a set of methods common for (almost) all device components.
 */
export declare abstract class Component<Attributes, Config, ConfigResponse = DefaultConfigResponse> extends ComponentBase {
    /**
     * The confoguration options for this component.
     * Use the `getConfig()` method to load these options.
     * This property is automatically populated by the `Device.loadConfig()` method.
     */
    config?: Config;
    /**
     * Retrieves the status of this component.
     */
    getStatus(): PromiseLike<Attributes>;
    /**
     * Retrieves the configuration of this component.
     */
    getConfig(): PromiseLike<Config>;
    /**
     * Requests changes in the configuration of this component.
     * @param config - The configuration options to set.
     */
    setConfig(config: Partial<Config>): PromiseLike<ConfigResponse>;
}
/**
 * Base class for components with an ID.
 */
export declare abstract class ComponentWithId<Attributes, Config, ConfigResponse = DefaultConfigResponse> extends Component<Attributes, Config, ConfigResponse> {
    readonly id: number;
    /**
     * @param name - The name of this component. Used when making RPCs.
     * @param device - The device that owns this component.
     * @param id - ID of this component.
     * @param key - The key used to identify the component in status updates etc. If `null`, the component name
     * in lower case letters will be used. The component ID will be appended to this key.
     */
    constructor(name: string, device: Device, id?: number, key?: string | null);
    /**
     * Retrieves the status of this component.
     */
    getStatus(): PromiseLike<Attributes>;
    /**
     * Retrieves the configuration of this component.
     */
    getConfig(): PromiseLike<Config>;
    /**
     * Requests changes in the configuration of this component.
     * @param config - The configuration options to set.
     */
    setConfig(config: Partial<Config>): PromiseLike<ConfigResponse>;
}
//# sourceMappingURL=base.d.ts.map