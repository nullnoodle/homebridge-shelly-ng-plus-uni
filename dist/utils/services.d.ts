import { API, Service, WithUUID } from 'homebridge';
import { CustomCharacteristics } from './characteristics';
declare type S = WithUUID<typeof Service>;
export interface CustomServices {
    PowerMeter: S;
}
/**
 * Returns a set of custom HomeKit services.
 * @param api - A reference to the homebridge API.
 * @param characteristics - Custom characteristics used with these services.
 */
export declare const createServices: (api: API, characteristics: CustomCharacteristics) => CustomServices;
export {};
//# sourceMappingURL=services.d.ts.map