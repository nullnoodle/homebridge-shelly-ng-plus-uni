"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro4PmDelegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Pro 4PM devices.
 */
class ShellyPro4PmDelegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        this.addSwitch(d.switch0);
        this.addSwitch(d.switch1);
        this.addSwitch(d.switch2);
        this.addSwitch(d.switch3);
    }
}
exports.ShellyPro4PmDelegate = ShellyPro4PmDelegate;
base_1.DeviceDelegate.registerDelegate(ShellyPro4PmDelegate, shellies_ng_1.ShellyPro4Pm);
//# sourceMappingURL=shelly-pro-4-pm.js.map