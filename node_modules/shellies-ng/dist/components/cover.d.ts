import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface CoverEnergyCounterAttributes {
    total: number;
    by_minute: number[];
    minute_ts: number;
}
export interface CoverTemperatureAttributes {
    tC: number | null;
    tF: number | null;
}
export interface CoverAttributes {
    id: number;
    source: string;
    state: 'open' | 'closed' | 'opening' | 'closing' | 'stopped' | 'calibrating';
    apower: number;
    voltage: number;
    current: number;
    pf: number;
    aenergy: CoverEnergyCounterAttributes;
    current_pos: number | null;
    target_pos: number | null;
    move_timeout?: number;
    move_started_at?: number;
    pos_control: boolean;
    temperature?: CoverTemperatureAttributes;
    errors?: string[];
}
export interface CoverAcMotorConfig {
    idle_power_thr: number;
}
export interface CoverObstructionDetectionConfig {
    enable: boolean;
    direction: 'open' | 'close' | 'both';
    action: 'stop' | 'reverse';
    power_thr: number;
    holdoff: number;
}
export interface CoverSafetySwitchConfig {
    enable: boolean;
    direction: 'open' | 'close' | 'both';
    action: 'stop' | 'reverse' | 'pause';
    allowed_move: 'reverse' | null;
}
export interface CoverConfig {
    id: number;
    name: string | null;
    in_mode?: 'single' | 'dual' | 'detached';
    initial_state: 'open' | 'closed' | 'stopped';
    power_limit: number;
    voltage_limit: number;
    current_limit: number;
    motor?: CoverAcMotorConfig;
    maxtime_open: number;
    maxtime_close: number;
    swap_inputs?: boolean;
    invert_directions: boolean;
    obstruction_detection: CoverObstructionDetectionConfig;
    safety_switch?: CoverSafetySwitchConfig;
}
/**
 * Handles the operation of moorized garage doors, window blinds, roof skylights etc.
 */
export declare class Cover extends ComponentWithId<CoverAttributes, CoverConfig> implements CoverAttributes {
    /**
     * Source of the last command.
     */
    readonly source: string;
    /**
     * The current state.
     */
    readonly state: 'open' | 'closed' | 'opening' | 'closing' | 'stopped' | 'calibrating';
    /**
     * The current (last measured) instantaneous power delivered to the attached
     * load.
     */
    readonly apower: number;
    /**
     * Last measured voltage (in Volts).
     */
    readonly voltage: number;
    /**
     * Last measured current (in Amperes).
     */
    readonly current: number;
    /**
     * Last measured power factor.
     */
    readonly pf: number;
    /**
     * Information about the energy counter.
     */
    readonly aenergy: CoverEnergyCounterAttributes;
    /**
     * The current position in percent, from `0` (fully closed) to `100` (fully open); or `null` if not calibrated.
     */
    readonly current_pos: number | null;
    /**
     * The requested target position in percent, from `0` (fully closed) to `100` (fully open); or `null` if not calibrated
     * or not actively moving.
     */
    readonly target_pos: number | null;
    /**
     * A timeout (in seconds) after which the cover will automatically stop moving; or `undefined` if not actively moving.
     */
    readonly move_timeout: number | undefined;
    /**
     * The time at which the movement began; or `undefined` if not actively moving.
     */
    readonly move_started_at: number | undefined;
    /**
     * Whether the cover has been calibrated.
     */
    readonly pos_control: boolean;
    /**
     * Information about the temperature sensor (if applicable).
     */
    readonly temperature: CoverTemperatureAttributes | undefined;
    /**
     * Any error conditions that have occurred.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * Opens the cover.
     * @param duration - Move in open direction for the specified time (in seconds).
     */
    open(duration?: number): PromiseLike<null>;
    /**
     * Closes the cover.
     * @param duration - Move in close direction for the specified time (in seconds).
     */
    close(duration?: number): PromiseLike<null>;
    /**
     * Stops any ongoing movement.
     */
    stop(): PromiseLike<null>;
    /**
     * Moves the cover to the given position.
     * One, but not both, of `pos` and `rel` must be specified.
     * @param pos - An absolute position (in percent).
     * @param rel - A relative position (in percent).
     */
    goToPosition(pos?: number, rel?: number): PromiseLike<null>;
    /**
     * Starts the calibration procedure.
     */
    calibrate(): PromiseLike<null>;
}
//# sourceMappingURL=cover.d.ts.map