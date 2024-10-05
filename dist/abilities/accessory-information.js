"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryInformationAbility = void 0;
const base_1 = require("./base");
/**
 * Handles the AccessoryInformation service.
 */
class AccessoryInformationAbility extends base_1.Ability {
    /**
     * @param device - The associated device.
     */
    constructor(device) {
        super();
        this.device = device;
    }
    get serviceClass() {
        return this.Service.AccessoryInformation;
    }
    initialize() {
        this.service
            .setCharacteristic(this.Characteristic.Name, this.platformAccessory.displayName)
            .setCharacteristic(this.Characteristic.Manufacturer, 'Allterco')
            .setCharacteristic(this.Characteristic.Model, this.device.modelName)
            .setCharacteristic(this.Characteristic.SerialNumber, this.device.macAddress)
            .setCharacteristic(this.Characteristic.FirmwareRevision, this.device.firmware.version || '1.0.0');
    }
    detach() {
        // no event handlers
    }
}
exports.AccessoryInformationAbility = AccessoryInformationAbility;
//# sourceMappingURL=accessory-information.js.map