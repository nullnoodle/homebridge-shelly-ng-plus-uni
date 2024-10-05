"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerMeterAbility = void 0;
const base_1 = require("./base");
/**
* This ability sets up a custom service that reports power meter readings.
 */
class PowerMeterAbility extends base_1.Ability {
    /**
     * @param component - The switch or cover component to get readings from.
     */
    constructor(component) {
        super(`Power Meter ${component.id + 1}`, `power-meter-${component.id}`);
        this.component = component;
    }
    get serviceClass() {
        return this.customServices.PowerMeter;
    }
    initialize() {
        var _a;
        const s = this.service;
        const c = this.component;
        const cc = this.customCharacteristics;
        // setup Current Consumption
        s.setCharacteristic(cc.CurrentConsumption, (_a = c.apower) !== null && _a !== void 0 ? _a : 0);
        c.on('change:apower', this.apowerChangeHandler, this);
        // setup Voltage
        if (c.voltage !== undefined) {
            s.setCharacteristic(cc.Voltage, c.voltage);
            c.on('change:voltage', this.voltageChangeHandler, this);
        }
        else {
            this.removeCharacteristic(cc.Voltage);
        }
        // setup Electric Current
        if (c.current !== undefined) {
            s.setCharacteristic(cc.ElectricCurrent, c.current);
            c.on('change:current', this.currentChangeHandler, this);
        }
        else {
            this.removeCharacteristic(cc.ElectricCurrent);
        }
        // setup Total Consumption
        if (c.aenergy !== undefined) {
            s.setCharacteristic(cc.TotalConsumption, c.aenergy.total / 1000);
            c.on('change:aenergy', this.aenergyChangeHandler, this);
        }
        else {
            this.removeCharacteristic(cc.TotalConsumption);
        }
    }
    detach() {
        this.component
            .off('change:apower', this.apowerChangeHandler, this)
            .off('change:voltage', this.voltageChangeHandler, this)
            .off('change:current', this.currentChangeHandler, this)
            .off('change:aenergy', this.aenergyChangeHandler, this);
    }
    /**
     * Handles changes to the `apower` property.
     */
    apowerChangeHandler(value) {
        this.service.updateCharacteristic(this.customCharacteristics.CurrentConsumption, value);
    }
    /**
     * Handles changes to the `voltage` property.
     */
    voltageChangeHandler(value) {
        this.service.updateCharacteristic(this.customCharacteristics.Voltage, value);
    }
    /**
     * Handles changes to the `current` property.
     */
    currentChangeHandler(value) {
        this.service.updateCharacteristic(this.customCharacteristics.ElectricCurrent, value);
    }
    /**
     * Handles changes to the `aenergy` property.
     */
    aenergyChangeHandler(value) {
        const attr = value;
        this.service.updateCharacteristic(this.customCharacteristics.TotalConsumption, attr.total / 1000);
    }
}
exports.PowerMeterAbility = PowerMeterAbility;
//# sourceMappingURL=power-meter.js.map