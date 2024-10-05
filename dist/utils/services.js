"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServices = void 0;
/**
 * Returns a set of custom HomeKit services.
 * @param api - A reference to the homebridge API.
 * @param characteristics - Custom characteristics used with these services.
 */
const createServices = (api, characteristics) => {
    /**
     * Reports power meter readings.
     */
    class PowerMeter extends api.hap.Service {
        constructor(displayName, subtype) {
            super(displayName, PowerMeter.UUID, subtype);
            this.addCharacteristic(characteristics.CurrentConsumption);
            this.addOptionalCharacteristic(characteristics.TotalConsumption);
            this.addOptionalCharacteristic(characteristics.ElectricCurrent);
            this.addOptionalCharacteristic(characteristics.Voltage);
        }
    }
    PowerMeter.UUID = 'DEDBEA44-11ED-429C-BD75-9A2286AA8707';
    return {
        PowerMeter,
    };
};
exports.createServices = createServices;
//# sourceMappingURL=services.js.map