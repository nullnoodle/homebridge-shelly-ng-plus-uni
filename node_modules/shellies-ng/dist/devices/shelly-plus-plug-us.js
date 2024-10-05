"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusPlugUs = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPlusPlugUs extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.switch0 = new components_1.Switch(this, 0);
        this.script = new components_1.Script(this);
    }
}
ShellyPlusPlugUs.model = 'SNPL-00116US';
ShellyPlusPlugUs.modelName = 'Shelly Plus Plug US';
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPlusPlugUs.prototype, "script", void 0);
exports.ShellyPlusPlugUs = ShellyPlusPlugUs;
base_1.Device.registerClass(ShellyPlusPlugUs);
//# sourceMappingURL=shelly-plus-plug-us.js.map