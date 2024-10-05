"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusI4Delegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
const abilities_1 = require("../abilities");
/**
 * Handles Shelly Plus I4 devices.
 */
class ShellyPlusI4Delegate extends base_1.DeviceDelegate {
    setup() {
        var _a, _b, _c, _d;
        const d = this.device;
        // determine each input type
        const input0IsButton = ((_a = d.input0.config) === null || _a === void 0 ? void 0 : _a.type) === 'button';
        const input1IsButton = ((_b = d.input1.config) === null || _b === void 0 ? void 0 : _b.type) === 'button';
        const input2IsButton = ((_c = d.input2.config) === null || _c === void 0 ? void 0 : _c.type) === 'button';
        const input3IsButton = ((_d = d.input3.config) === null || _d === void 0 ? void 0 : _d.type) === 'button';
        // create an accessory for all button inputs
        this.createAccessory('buttons', null, new abilities_1.StatelessProgrammableSwitchAbility(d.input0).setActive(input0IsButton), new abilities_1.StatelessProgrammableSwitchAbility(d.input1).setActive(input1IsButton), new abilities_1.StatelessProgrammableSwitchAbility(d.input2).setActive(input2IsButton), new abilities_1.StatelessProgrammableSwitchAbility(d.input3).setActive(input3IsButton), new abilities_1.ServiceLabelAbility()).setActive(input0IsButton || input1IsButton || input2IsButton || input3IsButton);
        // create accessories for all switch inputs
        this.createAccessory('switch0', null, new abilities_1.ReadonlySwitchAbility(d.input0)).setActive(!input0IsButton);
        this.createAccessory('switch1', null, new abilities_1.ReadonlySwitchAbility(d.input1)).setActive(!input1IsButton);
        this.createAccessory('switch2', null, new abilities_1.ReadonlySwitchAbility(d.input2)).setActive(!input2IsButton);
        this.createAccessory('switch3', null, new abilities_1.ReadonlySwitchAbility(d.input3)).setActive(!input3IsButton);
    }
}
exports.ShellyPlusI4Delegate = ShellyPlusI4Delegate;
base_1.DeviceDelegate.registerDelegate(ShellyPlusI4Delegate, shellies_ng_1.ShellyPlusI4);
//# sourceMappingURL=shelly-plus-i4.js.map