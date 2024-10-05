"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro2PmDelegate = void 0;
const shellies_ng_1 = require("shellies-ng");
const base_1 = require("./base");
/**
 * Handles Shelly Pro 2 PM devices.
 */
class ShellyPro2PmDelegate extends base_1.DeviceDelegate {
    setup() {
        const d = this.device;
        const isCover = d.profile === 'cover';
        this.addCover(d.cover0, { active: isCover });
        this.addSwitch(d.switch0, { active: !isCover });
        this.addSwitch(d.switch1, { active: !isCover });
    }
}
exports.ShellyPro2PmDelegate = ShellyPro2PmDelegate;
base_1.DeviceDelegate.registerDelegate(ShellyPro2PmDelegate, shellies_ng_1.ShellyPro2Pm, shellies_ng_1.ShellyPro2PmRev1, shellies_ng_1.ShellyPro2PmRev2);
//# sourceMappingURL=shelly-pro-2-pm.js.map