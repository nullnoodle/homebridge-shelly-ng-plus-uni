import { CharacteristicValue } from 'homebridge';
import { Cover } from 'shellies-ng';
import { Ability, ServiceClass } from './base';
export declare class CoverAbility extends Ability {
    readonly component: Cover;
    readonly type: 'door' | 'window' | 'windowCovering';
    /**
     * @param component - The cover component to control.
     */
    constructor(component: Cover, type?: 'door' | 'window' | 'windowCovering');
    protected get serviceClass(): ServiceClass;
    /**
     * The current state of the cover.
     */
    protected get positionState(): number;
    /**
     * The current position of the cover.
     */
    protected get currentPosition(): number;
    /**
     * The target position that the cover is moving towards.
     */
    protected get targetPosition(): number;
    protected initialize(): void;
    detach(): void;
    /**
     * Handles changes to the TargetPosition characteristic.
     */
    protected targetPositionSetHandler(value: CharacteristicValue): Promise<void>;
    /**
     * Handles changes to the `state` property.
     */
    protected stateChangeHandler(): void;
    /**
     * Handles changes to the `current_pos` property.
     */
    protected currentPosChangeHandler(): void;
    /**
     * Handles changes to the `target_pos` property.
     */
    protected targetPosChangeHandler(): void;
}
//# sourceMappingURL=cover.d.ts.map