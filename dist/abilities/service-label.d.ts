import { Ability, ServiceClass } from './base';
export declare class ServiceLabelAbility extends Ability {
    readonly namespace: 'dots' | 'arabicNumerals';
    /**
     * @param namespace - The naming schema for the accessory.
     */
    constructor(namespace?: 'dots' | 'arabicNumerals');
    protected get serviceClass(): ServiceClass;
    protected initialize(): void;
    detach(): void;
}
//# sourceMappingURL=service-label.d.ts.map