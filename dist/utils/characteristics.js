"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCharacteristics = void 0;
/**
 * Returns a set of custom HomeKit characteristics.
 * @param api - A reference to the homebridge API.
 */
const createCharacteristics = (api) => {
    /**
     * Current energy consumption, in watts.
     */
    class CurrentConsumption extends api.hap.Characteristic {
        constructor() {
            super('Current Consumption', CurrentConsumption.UUID, {
                format: "float" /* api.hap.Formats.FLOAT */,
                perms: ["ev" /* api.hap.Perms.NOTIFY */, "pr" /* api.hap.Perms.READ */],
                unit: 'W',
                minValue: 0,
                maxValue: 12000,
                minStep: 0.1,
            });
        }
    }
    CurrentConsumption.UUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52';
    /**
     * Current measured electric current, in amperes.
     */
    class ElectricCurrent extends api.hap.Characteristic {
        constructor() {
            super('Electric Current', ElectricCurrent.UUID, {
                format: "float" /* api.hap.Formats.FLOAT */,
                perms: ["ev" /* api.hap.Perms.NOTIFY */, "pr" /* api.hap.Perms.READ */],
                unit: 'A',
                minValue: 0,
                maxValue: 48,
                minStep: 0.1,
            });
        }
    }
    ElectricCurrent.UUID = 'E863F126-079E-48FF-8F27-9C2605A29F52';
    /**
     * Total energy consumption, in kilowatt hours.
     */
    class TotalConsumption extends api.hap.Characteristic {
        constructor() {
            super('Total Consumption', TotalConsumption.UUID, {
                format: "float" /* api.hap.Formats.FLOAT */,
                perms: ["ev" /* api.hap.Perms.NOTIFY */, "pr" /* api.hap.Perms.READ */],
                unit: 'kWh',
                minValue: 0,
                maxValue: 1000000,
                minStep: 0.1,
            });
        }
    }
    TotalConsumption.UUID = 'E863F10C-079E-48FF-8F27-9C2605A29F52';
    /**
     * Current measured voltage, in volts.
     */
    class Voltage extends api.hap.Characteristic {
        constructor() {
            super('Voltage', Voltage.UUID, {
                format: "float" /* api.hap.Formats.FLOAT */,
                perms: ["ev" /* api.hap.Perms.NOTIFY */, "pr" /* api.hap.Perms.READ */],
                unit: 'V',
                minValue: -1000,
                maxValue: 1000,
                minStep: 0.1,
            });
        }
    }
    Voltage.UUID = 'E863F10A-079E-48FF-8F27-9C2605A29F52';
    return {
        CurrentConsumption,
        ElectricCurrent,
        TotalConsumption,
        Voltage,
    };
};
exports.createCharacteristics = createCharacteristics;
//# sourceMappingURL=characteristics.js.map