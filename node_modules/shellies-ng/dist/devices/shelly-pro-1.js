"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro1Rev2 = exports.ShellyPro1Rev1 = exports.ShellyPro1 = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPro1 extends base_1.Device {
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
ShellyPro1.model = 'SPSW-001XE16EU';
ShellyPro1.modelName = 'Shelly Pro 1';
__decorate([
    base_1.component
], ShellyPro1.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPro1.prototype, "script", void 0);
exports.ShellyPro1 = ShellyPro1;
base_1.Device.registerClass(ShellyPro1);
class ShellyPro1Rev1 extends ShellyPro1 {
}
exports.ShellyPro1Rev1 = ShellyPro1Rev1;
ShellyPro1Rev1.model = 'SPSW-101XE16EU';
base_1.Device.registerClass(ShellyPro1Rev1);
class ShellyPro1Rev2 extends ShellyPro1Rev1 {
}
exports.ShellyPro1Rev2 = ShellyPro1Rev2;
ShellyPro1Rev2.model = 'SPSW-201XE16EU';
base_1.Device.registerClass(ShellyPro1Rev2);
//# sourceMappingURL=shelly-pro-1.js.map