import { Device } from 'shellies-ng';
import { Logger, LogLevel } from 'homebridge';
/**
 * Utility used to prefix log messages with device IDs.
 */
export declare class DeviceLogger {
    readonly device: Device;
    protected readonly logger: Logger;
    protected readonly prefix: string;
    /**
     * @param device - The device to use.
     * @param deviceName - A user-friendly name of the device.
     * @param logger - The logging device to write to.
     */
    constructor(device: Device, deviceName: string | undefined, logger: Logger);
    info(message: string, ...parameters: unknown[]): void;
    warn(message: string, ...parameters: unknown[]): void;
    error(message: string, ...parameters: unknown[]): void;
    debug(message: string, ...parameters: unknown[]): void;
    log(level: LogLevel, message: string, ...parameters: unknown[]): void;
}
//# sourceMappingURL=device-logger.d.ts.map