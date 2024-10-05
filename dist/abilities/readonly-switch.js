"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadonlySwitchAbility = void 0;
const base_1 = require("./base");
/**
 * This ability creates a switch that can't be controlled from HomeKit, it only reflects
 * the device's input state.
 */
class ReadonlySwitchAbility extends base_1.Ability {
    /**
     * @param component - The input component to represent.
     */
    constructor(component) {
        super(`Switch ${component.id + 1}`, `readonly-switch-${component.id}`);
        this.component = component;
    }
    get serviceClass() {
        return this.Service.Switch;
    }
    initialize() {
        var _a;
        this.service.getCharacteristic(this.Characteristic.On)
            // remove the write permissions
            .setProps({
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        })
            // set the initial value
            .setValue((_a = this.component.state) !== null && _a !== void 0 ? _a : false);
        // listen for updates from the device
        this.component.on('change:state', this.stateChangeHandler, this);
    }
    detach() {
        this.component.off('change:state', this.stateChangeHandler, this);
    }
    /**
     * Handles changes to the `state` property.
     */
    stateChangeHandler(value) {
        const v = value === null ? false : value;
        this.service.getCharacteristic(this.Characteristic.On)
            .updateValue(v);
    }
}
exports.ReadonlySwitchAbility = ReadonlySwitchAbility;
//# sourceMappingURL=readonly-switch.js.map