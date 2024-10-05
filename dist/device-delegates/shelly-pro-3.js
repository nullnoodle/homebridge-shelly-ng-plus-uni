"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro3Delegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Pro 3 devices.
 */
class ShellyPro3Delegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        this.addSwitch(d.switch0);
        this.addSwitch(d.switch1);
        this.addSwitch(d.switch2);
    }
}
exports.ShellyPro3Delegate = ShellyPro3Delegate;
base_1.DeviceDelegate.registerDelegate(ShellyPro3Delegate, shellies_ng_1.ShellyPro3);
//# sourceMappingURL=shelly-pro-3.js.map