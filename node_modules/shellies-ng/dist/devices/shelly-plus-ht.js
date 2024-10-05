"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusHT = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPlusHT extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.temperature0 = new components_1.Temperature(this, 0);
        this.humidity0 = new components_1.Humidity(this, 0);
        this.devicePower0 = new components_1.DevicePower(this, 0);
        this.htUi = new components_1.HtUi(this);
    }
}
ShellyPlusHT.model = 'SNSN-0013A';
ShellyPlusHT.modelName = 'Shelly Plus H&T';
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "temperature0", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "humidity0", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "devicePower0", void 0);
__decorate([
    base_1.component
], ShellyPlusHT.prototype, "htUi", void 0);
exports.ShellyPlusHT = ShellyPlusHT;
base_1.Device.registerClass(ShellyPlusHT);
//# sourceMappingURL=shelly-plus-ht.js.map