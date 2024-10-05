"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceDiscoverer = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
/**
 * Base class for device discoverers.
 */
class DeviceDiscoverer extends eventemitter3_1.default {
    /**
     * Handles a discovered device.
     * Subclasses should call this method when a device has been discovered.
     */
    handleDiscoveredDevice(identifiers) {
        // emit an event
        this.emit('discover', identifiers);
    }
}
exports.DeviceDiscoverer = DeviceDiscoverer;
//# sourceMappingURL=base.js.map