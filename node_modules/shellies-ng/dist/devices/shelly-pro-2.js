"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro2Rev2 = exports.ShellyPro2Rev1 = exports.ShellyPro2 = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPro2 extends base_1.Device {
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
        this.switch1 = new components_1.Switch(this, 1);
        this.script = new components_1.Script(this);
    }
}
ShellyPro2.model = 'SPSW-002XE16EU';
ShellyPro2.modelName = 'Shelly Pro 2';
__decorate([
    base_1.component
], ShellyPro2.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "switch1", void 0);
__decorate([
    base_1.component
], ShellyPro2.prototype, "script", void 0);
exports.ShellyPro2 = ShellyPro2;
base_1.Device.registerClass(ShellyPro2);
class ShellyPro2Rev1 extends ShellyPro2 {
}
exports.ShellyPro2Rev1 = ShellyPro2Rev1;
ShellyPro2Rev1.model = 'SPSW-102XE16EU';
base_1.Device.registerClass(ShellyPro2Rev1);
class ShellyPro2Rev2 extends ShellyPro2Rev1 {
}
exports.ShellyPro2Rev2 = ShellyPro2Rev2;
ShellyPro2Rev2.model = 'SPSW-202XE16EU';
base_1.Device.registerClass(ShellyPro2Rev2);
//# sourceMappingURL=shelly-pro-2.js.map