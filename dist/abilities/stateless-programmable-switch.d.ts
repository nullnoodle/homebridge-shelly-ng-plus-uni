import { Input } from 'shellies-ng';
import { Ability, ServiceClass } from './base';
declare enum ButtonPress {
    Single = "single",
    Double = "double",
    Long = "long"
}
export declare class StatelessProgrammableSwitchAbility extends Ability {
    readonly component: Input;
    /**
     * @param component - The input component to control.
     */
    constructor(component: Input);
    protected get serviceClass(): ServiceClass;
    protected initialize(): void;
    detach(): void;
    /**
     * Triggers a button press event.
     * @param type - The type of button press to trigger.
     */
    protected triggerPress(type: ButtonPress): void;
    /**
     * Handles 'singlePush' events from our input component.
     */
    protected singlePushHandler(): void;
    /**
     * Handles 'doublePush' events from our input component.
     */
    protected doublePushHandler(): void;
    /**
     * Handles 'longPush' events from our input component.
     */
    protected longPushHandler(): void;
}
export {};
//# sourceMappingURL=stateless-programmable-switch.d.ts.map