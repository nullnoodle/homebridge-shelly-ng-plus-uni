"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro2PmRev2 = exports.ShellyPro2PmRev1 = exports.ShellyPro2Pm = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPro2Pm extends base_1.MultiProfileDevice {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.cover0 = new components_1.Cover(this, 0);
        this.input0 = new components_1.Input(this, 0);
        this.input1 = new components_1.Input(this, 1);
        this.switch0 = new components_1.Switch(this, 0);
        this.switch1 = new components_1.Switch(this, 1);
        this.script = new components_1.Script(this);
    }
}
ShellyPro2Pm.model = 'SPSW-002PE16EU';
ShellyPro2Pm.modelName = 'Shelly Pro 2 PM';
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "cover0", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "switch1", void 0);
__decorate([
    base_1.component
], ShellyPro2Pm.prototype, "script", void 0);
exports.ShellyPro2Pm = ShellyPro2Pm;
base_1.Device.registerClass(ShellyPro2Pm);
class ShellyPro2PmRev1 extends ShellyPro2Pm {
}
exports.ShellyPro2PmRev1 = ShellyPro2PmRev1;
ShellyPro2PmRev1.model = 'SPSW-102PE16EU';
base_1.Device.registerClass(ShellyPro2PmRev1);
class ShellyPro2PmRev2 extends ShellyPro2PmRev1 {
}
exports.ShellyPro2PmRev2 = ShellyPro2PmRev2;
ShellyPro2PmRev2.model = 'SPSW-202PE16EU';
base_1.Device.registerClass(ShellyPro2PmRev2);
//# sourceMappingURL=shelly-pro-2-pm.js.map