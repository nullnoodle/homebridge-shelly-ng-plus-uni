"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusUni = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPlusUni extends base_1.Device {
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
ShellyPlusUni.model = 'SNSN-0043X';
ShellyPlusUni.modelName = 'Shelly Plus Uni';
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "switch1", void 0);
__decorate([
    base_1.component
], ShellyPlusUni.prototype, "script", void 0);
exports.ShellyPlusUni = ShellyPlusUni;
base_1.Device.registerClass(ShellyPlusUni);
//# sourceMappingURL=shelly-plus-uni.js.map