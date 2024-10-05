import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface TemperatureAttributes {
    id: number;
    tC: number | null;
    tF: number | null;
    errors?: string[];
}
export interface TemperatureConfig {
    id: number;
    name: string | null;
    report_thr_C: number;
}
/**
 * Handles the monitoring of a device's temperature sensor.
 */
export declare class Temperature extends ComponentWithId<TemperatureAttributes, TemperatureConfig> implements TemperatureAttributes {
    /**
     * Current temperature, in Celsius.
     */
    readonly tC: number | null;
    /**
     * Current temperature, in Fahrenheit.
     */
    readonly tF: number | null;
    /**
     * Any error conditions that have occurred.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
}
//# sourceMappingURL=temperature.d.ts.map