import { CharacteristicValue as ShelliesCharacteristicValue, Input } from 'shellies-ng';
import { Ability, ServiceClass } from './base';
/**
 * This ability creates a switch that can't be controlled from HomeKit, it only reflects
 * the device's input state.
 */
export declare class ReadonlySwitchAbility extends Ability {
    readonly component: Input;
    /**
     * @param component - The input component to represent.
     */
    constructor(component: Input);
    protected get serviceClass(): ServiceClass;
    protected initialize(): void;
    detach(): void;
    /**
     * Handles changes to the `state` property.
     */
    protected stateChangeHandler(value: ShelliesCharacteristicValue): void;
}
//# sourceMappingURL=readonly-switch.d.ts.map