import { Device } from 'shellies-ng';
import { Ability, ServiceClass } from './base';
/**
 * Handles the AccessoryInformation service.
 */
export declare class AccessoryInformationAbility extends Ability {
    readonly device: Device;
    /**
     * @param device - The associated device.
     */
    constructor(device: Device);
    protected get serviceClass(): ServiceClass;
    protected initialize(): void;
    detach(): void;
}
//# sourceMappingURL=accessory-information.d.ts.map