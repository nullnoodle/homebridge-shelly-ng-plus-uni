"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusUniDelegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Plus Uni devices.
 */
class ShellyPlusUniDelegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        this.addSwitch(d.switch0, { single: true });
        // this.addSwitch(d.switch1, { single: true });
    }
}
exports.ShellyPlusUniDelegate = ShellyPlusUniDelegate;
base_1.DeviceDelegate.registerDelegate(ShellyPlusUniDelegate, shellies_ng_1.ShellyPlusUni);
//# sourceMappingURL=shelly-plus-uni.js.map