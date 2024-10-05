"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro2Delegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Pro 2 devices.
 */
class ShellyPro2Delegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        this.addSwitch(d.switch0);
        this.addSwitch(d.switch1);
    }
}
exports.ShellyPro2Delegate = ShellyPro2Delegate;
base_1.DeviceDelegate.registerDelegate(ShellyPro2Delegate, shellies_ng_1.ShellyPro2, shellies_ng_1.ShellyPro2Rev1, shellies_ng_1.ShellyPro2Rev2);
//# sourceMappingURL=shelly-pro-2.js.map