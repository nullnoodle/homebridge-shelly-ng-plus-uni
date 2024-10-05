import { CharacteristicValue } from 'homebridge';
import { CharacteristicValue as ShelliesCharacteristicValue, Switch } from 'shellies-ng';
import { Ability, ServiceClass } from './base';
export declare class OutletAbility extends Ability {
    readonly component: Switch;
    /**
     * @param component - The switch component to control.
     */
    constructor(component: Switch);
    protected get serviceClass(): ServiceClass;
    protected initialize(): void;
    detach(): void;
    /**
     * Handles changes to the Outlet.On characteristic.
     */
    protected onSetHandler(value: CharacteristicValue): Promise<void>;
    /**
     * Handles changes to the `output` property.
     */
    protected outputChangeHandler(value: ShelliesCharacteristicValue): void;
    /**
     * Handles changes to the `apower` property.
     */
    protected apowerChangeHandler(value: ShelliesCharacteristicValue): void;
}
//# sourceMappingURL=outlet.d.ts.map