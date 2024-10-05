"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusPlugUsDelegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Plus Plug US devices.
 */
class ShellyPlusPlugUsDelegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        this.addSwitch(d.switch0, { single: true });
    }
}
exports.ShellyPlusPlugUsDelegate = ShellyPlusPlugUsDelegate;
base_1.DeviceDelegate.registerDelegate(ShellyPlusPlugUsDelegate, shellies_ng_1.ShellyPlusPlugUs);
//# sourceMappingURL=shelly-plus-plug-us.js.map