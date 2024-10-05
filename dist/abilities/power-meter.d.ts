import { CharacteristicValue as ShelliesCharacteristicValue, Cover, Switch } from 'shellies-ng';
import { Ability, ServiceClass } from './base';
/**
* This ability sets up a custom service that reports power meter readings.
 */
export declare class PowerMeterAbility extends Ability {
    readonly component: Switch | Cover;
    /**
     * @param component - The switch or cover component to get readings from.
     */
    constructor(component: Switch | Cover);
    protected get serviceClass(): ServiceClass;
    protected initialize(): void;
    detach(): void;
    /**
     * Handles changes to the `apower` property.
     */
    protected apowerChangeHandler(value: ShelliesCharacteristicValue): void;
    /**
     * Handles changes to the `voltage` property.
     */
    protected voltageChangeHandler(value: ShelliesCharacteristicValue): void;
    /**
     * Handles changes to the `current` property.
     */
    protected currentChangeHandler(value: ShelliesCharacteristicValue): void;
    /**
     * Handles changes to the `aenergy` property.
     */
    protected aenergyChangeHandler(value: ShelliesCharacteristicValue): void;
}
//# sourceMappingURL=power-meter.d.ts.map