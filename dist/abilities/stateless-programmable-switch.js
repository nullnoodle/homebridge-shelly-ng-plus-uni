"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatelessProgrammableSwitchAbility = void 0;
const base_1 = require("./base");
var ButtonPress;
(function (ButtonPress) {
    ButtonPress["Single"] = "single";
    ButtonPress["Double"] = "double";
    ButtonPress["Long"] = "long";
})(ButtonPress || (ButtonPress = {}));
class StatelessProgrammableSwitchAbility extends base_1.Ability {
    /**
     * @param component - The input component to control.
     */
    constructor(component) {
        super(`Button ${component.id + 1}`, `stateless-programmable-switch-${component.id}`);
        this.component = component;
    }
    get serviceClass() {
        return this.Service.StatelessProgrammableSwitch;
    }
    initialize() {
        // set the index number for this switch
        this.service.setCharacteristic(this.Characteristic.ServiceLabelIndex, this.component.id + 1);
        // listen for button press events
        this.component
            .on('singlePush', this.singlePushHandler, this)
            .on('doublePush', this.doublePushHandler, this)
            .on('longPush', this.longPushHandler, this);
    }
    detach() {
        this.component
            .off('singlePush', this.singlePushHandler, this)
            .off('doublePush', this.doublePushHandler, this)
            .off('longPush', this.longPushHandler, this);
    }
    /**
     * Triggers a button press event.
     * @param type - The type of button press to trigger.
     */
    triggerPress(type) {
        this.log.debug(`Input ${this.component.id}: ${type} press`);
        const PSE = this.Characteristic.ProgrammableSwitchEvent;
        let value;
        // get the corresponding characteristic value
        switch (type) {
            case ButtonPress.Single:
                value = PSE.SINGLE_PRESS;
                break;
            case ButtonPress.Double:
                value = PSE.DOUBLE_PRESS;
                break;
            case ButtonPress.Long:
                value = PSE.LONG_PRESS;
                break;
        }
        // update the characteristic
        this.service.getCharacteristic(this.Characteristic.ProgrammableSwitchEvent)
            .updateValue(value);
    }
    /**
     * Handles 'singlePush' events from our input component.
     */
    singlePushHandler() {
        this.triggerPress(ButtonPress.Single);
    }
    /**
     * Handles 'doublePush' events from our input component.
     */
    doublePushHandler() {
        this.triggerPress(ButtonPress.Double);
    }
    /**
     * Handles 'longPush' events from our input component.
     */
    longPushHandler() {
        this.triggerPress(ButtonPress.Long);
    }
}
exports.StatelessProgrammableSwitchAbility = StatelessProgrammableSwitchAbility;
//# sourceMappingURL=stateless-programmable-switch.js.map