"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchAbility = void 0;
const base_1 = require("./base");
class SwitchAbility extends base_1.Ability {
    /**
     * @param component - The switch component to control.
     */
    constructor(component) {
        super(`Switch ${component.id + 1}`, `switch-${component.id}`);
        this.component = component;
    }
    get serviceClass() {
        return this.Service.Switch;
    }
    initialize() {
        // set the initial value
        this.service.setCharacteristic(this.Characteristic.On, this.component.output);
        // listen for commands from HomeKit
        this.service.getCharacteristic(this.Characteristic.On)
            .onSet(this.onSetHandler.bind(this));
        // listen for updates from the device
        this.component.on('change:output', this.outputChangeHandler, this);
    }
    detach() {
        this.component.off('change:output', this.outputChangeHandler, this);
    }
    /**
     * Handles changes to the Switch.On characteristic.
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
}
exports.SwitchAbility = SwitchAbility;
//# sourceMappingURL=switch.js.map