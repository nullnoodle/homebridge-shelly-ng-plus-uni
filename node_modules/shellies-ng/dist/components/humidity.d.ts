import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface HumidityAttributes {
    id: number;
    rh: number | null;
    errors?: string[];
}
export interface HumidityConfig {
    id: number;
    name: string | null;
    report_thr: number;
}
/**
 * Handles the monitoring of a device's humidity sensor.
 */
export declare class Humidity extends ComponentWithId<HumidityAttributes, HumidityConfig> implements HumidityAttributes {
    /**
     * Relative humidity, in percent.
     */
    readonly rh: number | null;
    /**
     * Any error conditions that have occurred.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
}
//# sourceMappingURL=humidity.d.ts.map