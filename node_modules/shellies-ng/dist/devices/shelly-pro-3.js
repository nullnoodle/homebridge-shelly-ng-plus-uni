"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro3 = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPro3 extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.ethernet = new components_1.Ethernet(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.input0 = new components_1.Input(this, 0);
        this.input1 = new components_1.Input(this, 1);
        this.input2 = new components_1.Input(this, 2);
        this.switch0 = new components_1.Switch(this, 0);
        this.switch1 = new components_1.Switch(this, 1);
        this.switch2 = new components_1.Switch(this, 2);
        this.script = new components_1.Script(this);
    }
}
ShellyPro3.model = 'SPSW-003XE16EU';
ShellyPro3.modelName = 'Shelly Pro 3';
__decorate([
    base_1.component
], ShellyPro3.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "ethernet", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "input2", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "switch1", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "switch2", void 0);
__decorate([
    base_1.component
], ShellyPro3.prototype, "script", void 0);
exports.ShellyPro3 = ShellyPro3;
base_1.Device.registerClass(ShellyPro3);
//# sourceMappingURL=shelly-pro-3.js.map