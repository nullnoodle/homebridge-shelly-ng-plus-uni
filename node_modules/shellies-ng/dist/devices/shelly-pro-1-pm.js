"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro1PmRev2 = exports.ShellyPro1PmRev1 = exports.ShellyPro1Pm = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPro1Pm extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.input0 = new components_1.Input(this, 0);
        this.input1 = new components_1.Input(this, 1);
        this.switch0 = new components_1.Switch(this, 0);
        this.script = new components_1.Script(this);
    }
}
ShellyPro1Pm.model = 'SPSW-001PE16EU';
ShellyPro1Pm.modelName = 'Shelly Pro 1 PM';
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPro1Pm.prototype, "script", void 0);
exports.ShellyPro1Pm = ShellyPro1Pm;
base_1.Device.registerClass(ShellyPro1Pm);
class ShellyPro1PmRev1 extends ShellyPro1Pm {
}
exports.ShellyPro1PmRev1 = ShellyPro1PmRev1;
ShellyPro1PmRev1.model = 'SPSW-101PE16EU';
base_1.Device.registerClass(ShellyPro1PmRev1);
class ShellyPro1PmRev2 extends ShellyPro1PmRev1 {
}
exports.ShellyPro1PmRev2 = ShellyPro1PmRev2;
ShellyPro1PmRev2.model = 'SPSW-201PE16EU';
base_1.Device.registerClass(ShellyPro1PmRev2);
//# sourceMappingURL=shelly-pro-1-pm.js.map