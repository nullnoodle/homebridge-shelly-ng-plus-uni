"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletAbility = void 0;
const base_1 = require("./base");
class OutletAbility extends base_1.Ability {
    /**
     * @param component - The switch component to control.
     */
    constructor(component) {
        super(`Outlet ${component.id + 1}`, `outlet-${component.id}`);
        this.component = component;
    }
    get serviceClass() {
        return this.Service.Outlet;
    }
    initialize() {
        // set the initial values
        this.service
            .setCharacteristic(this.Characteristic.On, this.component.output).setCharacteristic(this.Characteristic.OutletInUse, this.component.apower !== undefined && this.component.apower !== 0);
        // listen for commands from HomeKit
        this.service.getCharacteristic(this.Characteristic.On)
            .onSet(this.onSetHandler.bind(this));
        // listen for updates from the device
        this.component
            .on('change:output', this.outputChangeHandler, this)
            .on('change:apower', this.apowerChangeHandler, this);
    }
    detach() {
        this.component
            .off('change:output', this.outputChangeHandler, this)
            .off('change:apower', this.apowerChangeHandler, this);
    }
    /**
     * Handles changes to the Outlet.On characteristic.
     */
    async onSetHandler(value) {
        if (value === this.component.output) {
            return;
        }
        try {
            await this.component.set(value);
        }
        catch (e) {
            this.log.error('Failed to set switch:', e instanceof Error ? e.message : e);
            throw -70402 /* this.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE */;
        }
    }
    /**
     * Handles changes to the `output` property.
     */
    outputChangeHandler(value) {
        this.service.getCharacteristic(this.Characteristic.On)
            .updateValue(value);
    }
    /**
     * Handles changes to the `apower` property.
     */
    apowerChangeHandler(value) {
        this.service.getCharacteristic(this.Characteristic.OutletInUse)
            .updateValue(value);
    }
}
exports.OutletAbility = OutletAbility;
//# sourceMappingURL=outlet.js.map