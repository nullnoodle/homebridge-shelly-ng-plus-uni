import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface DevicePowerBatteryStatus {
    V: number | null;
    percent: number | null;
}
export interface DevicePowerExternalSource {
    present: boolean;
}
export interface DevicePowerAttributes {
    id: number;
    battery: DevicePowerBatteryStatus;
    external?: DevicePowerExternalSource;
    errors?: string[];
}
export interface DevicePowerConfig {
}
/**
 * Handles the monitoring of a device's battery charge.
 */
export declare class DevicePower extends ComponentWithId<DevicePowerAttributes, DevicePowerConfig> implements DevicePowerAttributes {
    /**
     * Information about the battery charge.
     */
    readonly battery: DevicePowerBatteryStatus;
    /**
     * Information about the external power source.
     */
    readonly external: DevicePowerExternalSource | undefined;
    /**
     * Any error conditions that have occurred.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
}
//# sourceMappingURL=device-power.d.ts.map