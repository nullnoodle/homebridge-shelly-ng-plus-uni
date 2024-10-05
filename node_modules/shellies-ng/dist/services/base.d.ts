import { Device } from '../devices';
import { RpcParams } from '../rpc';
export declare abstract class Service {
    readonly name: string;
    readonly device: Device;
    /**
     * @param name - The name of this service.
     * @param device - The device that owns this service.
     */
    constructor(name: string, device: Device);
    /**
     * Shorthand method for making an RPC.
     */
    protected rpc<T>(method: string, params?: RpcParams): PromiseLike<T>;
}
//# sourceMappingURL=base.d.ts.map