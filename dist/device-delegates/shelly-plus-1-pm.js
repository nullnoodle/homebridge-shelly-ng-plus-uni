"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlus1PmDelegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Plus 1PM devices.
 */
class ShellyPlus1PmDelegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        this.addSwitch(d.switch0, { single: true });
    }
}
exports.ShellyPlus1PmDelegate = ShellyPlus1PmDelegate;
base_1.DeviceDelegate.registerDelegate(ShellyPlus1PmDelegate, shellies_ng_1.ShellyPlus1Pm, shellies_ng_1.ShellyPlus1PmUl);
//# sourceMappingURL=shelly-plus-1-pm.js.map