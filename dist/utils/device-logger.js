"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceLogger = void 0;
/**
 * Utility used to prefix log messages with device IDs.
 */
class DeviceLogger {
    /**
     * @param device - The device to use.
     * @param deviceName - A user-friendly name of the device.
     * @param logger - The logging device to write to.
     */
    constructor(device, deviceName, logger) {
        this.device = device;
        this.logger = logger;
        this.prefix = `[${deviceName || device.id}] `;
    }
    info(message, ...parameters) {
        this.log("info" /* LogLevel.INFO */, message, ...parameters);
    }
    warn(message, ...parameters) {
        this.log("warn" /* LogLevel.WARN */, message, ...parameters);
    }
    error(message, ...parameters) {
        this.log("error" /* LogLevel.ERROR */, message, ...parameters);
    }
    debug(message, ...parameters) {
        this.log("debug" /* LogLevel.DEBUG */, message, ...parameters);
    }
    log(level, message, ...parameters) {
        this.logger.log(level, this.prefix + message, ...parameters);
    }
}
exports.DeviceLogger = DeviceLogger;
//# sourceMappingURL=device-logger.js.map