import { API, Characteristic, WithUUID } from 'homebridge';
declare type C = WithUUID<new () => Characteristic> & WithUUID<typeof Characteristic>;
export interface CustomCharacteristics {
    CurrentConsumption: C;
    ElectricCurrent: C;
    TotalConsumption: C;
    Voltage: C;
}
/**
 * Returns a set of custom HomeKit characteristics.
 * @param api - A reference to the homebridge API.
 */
export declare const createCharacteristics: (api: API) => CustomCharacteristics;
export {};
//# sourceMappingURL=characteristics.d.ts.map