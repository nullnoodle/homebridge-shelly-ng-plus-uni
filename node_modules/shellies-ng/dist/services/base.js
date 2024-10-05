"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    /**
     * @param name - The name of this service.
     * @param device - The device that owns this service.
     */
    constructor(name, device) {
        this.name = name;
        this.device = device;
    }
    /**
     * Shorthand method for making an RPC.
     */
    rpc(method, params) {
        return this.device.rpcHandler.request(`${this.name}.${method}`, params);
    }
}
exports.Service = Service;
//# sourceMappingURL=base.js.map