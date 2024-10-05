import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface SwitchEnergyCounterAttributes {
    total: number;
    by_minute: number[];
    minute_ts: number;
}
export interface SwitchTemperatureAttributes {
    tC: number | null;
    tF: number | null;
}
export interface SwitchAttributes {
    id: number;
    source: string;
    output: boolean;
    timer_started_at?: number;
    timer_duration?: number;
    apower?: number;
    voltage?: number;
    current?: number;
    pf?: number;
    aenergy?: SwitchEnergyCounterAttributes;
    temperature: SwitchTemperatureAttributes;
    errors?: string[];
}
export interface SwitchConfig {
    id: number;
    name: string | null;
    in_mode: 'momentary' | 'follow' | 'flip' | 'detached';
    initial_state: 'off' | 'on' | 'restore_last' | 'match_input';
    auto_on: boolean;
    auto_on_delay: number;
    auto_off: boolean;
    auto_off_delay: number;
    input_id: number;
    power_limit?: number | null;
    voltage_limit?: number | null;
    current_limit?: number | null;
}
export interface SwitchSetResponse {
    was_on: boolean;
}
/**
 * Represents a switch (relay) of a device.
 */
export declare class Switch extends ComponentWithId<SwitchAttributes, SwitchConfig> implements SwitchAttributes {
    /**
     * Source of the last command.
     */
    readonly source: string;
    /**
     * true if the output channel is currently on, false otherwise.
     */
    readonly output: boolean;
    /**
     * Start time of the timer (as a UNIX timestamp, in UTC).
     */
    readonly timer_started_at: number | undefined;
    /**
     * Duration of the timer, in seconds;
     */
    readonly timer_duration: number | undefined;
    /**
     * The current (last measured) instantaneous power delivered to the attached
     * load (if applicable).
     */
    readonly apower: number | undefined;
    /**
     * Last measured voltage (in Volts, if applicable).
     */
    readonly voltage: number | undefined;
    /**
     * Last measured current (in Amperes, if applicable).
     */
    readonly current: number | undefined;
    /**
     * Last measured power factor (if applicable).
     */
    readonly pf: number | undefined;
    /**
     * Information about the energy counter (if applicable).
     */
    readonly aenergy: SwitchEnergyCounterAttributes | undefined;
    /**
     * Information about the temperature.
     */
    readonly temperature: SwitchTemperatureAttributes;
    /**
     * Any error conditions that have occurred.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * Toggles the switch.
     */
    toggle(): PromiseLike<SwitchSetResponse>;
    /**
     * Sets the output of the switch.
     * @param on - Whether to switch on or off.
     * @param toggle_after - Flip-back timer, in seconds.
     */
    set(on: boolean, toggle_after?: number): PromiseLike<SwitchSetResponse>;
}
//# sourceMappingURL=switch.d.ts.map