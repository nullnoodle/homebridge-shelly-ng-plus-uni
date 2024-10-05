import { ComponentWithId } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';
export interface InputAttributes {
    id: number;
    state: boolean | null;
}
export interface InputConfig {
    id: number;
    name: string | null;
    type: 'switch' | 'button';
    invert: boolean;
    factory_reset?: boolean;
}
/**
 * Handles the input of a device.
 */
export declare class Input extends ComponentWithId<InputAttributes, InputConfig> implements InputAttributes {
    /**
     * State of the input (null if stateless).
     */
    readonly state: boolean | null;
    constructor(device: Device, id?: number);
    handleEvent(event: RpcEvent): void;
}
//# sourceMappingURL=input.d.ts.map