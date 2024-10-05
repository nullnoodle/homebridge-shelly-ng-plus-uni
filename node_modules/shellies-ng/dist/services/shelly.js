"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const base_1 = require("./base");
/**
 * The common Shelly service that all devices have.
 */
class ShellyService extends base_1.Service {
    constructor(device) {
        super('Shelly', device);
    }
    /**
     * Retrieves the status of all of the components of the device.
     */
    getStatus() {
        return this.rpc('GetStatus');
    }
    /**
     * Retrieves the configuration of all the components of the device.
     */
    getConfig() {
        return this.rpc('GetConfig');
    }
    /**
     * Lists all available RPC methods.
     */
    listMethods() {
        return this.rpc('ListMethods');
    }
    /**
     * Retrieves information about the device.
     */
    getDeviceInfo(ident) {
        return this.rpc('GetDeviceInfo', {
            ident,
        });
    }
    /**
     * Retrieves a list of all available profiles and the type/count of functional components exposed for each profile.
     */
    listProfiles() {
        return this.rpc('ListProfiles');
    }
    /**
     * Sets the device profile.
     * @param name - Name of the device profile.
     */
    setProfile(name) {
        return this.rpc('SetProfile', {
            name,
        });
    }
    /**
     * Retrieves a list of all timezones.
     */
    listTimezones() {
        return this.rpc('ListTimezones');
    }
    /**
     * Retrieves the location of the device.
     */
    detectLocation() {
        return this.rpc('DetectLocation');
    }
    /**
     * Checks for a new firmware version.
     */
    checkForUpdate() {
        return this.rpc('CheckForUpdate');
    }
    /**
     * Requests an update of the device firmware.
     * Either `stage` or `url` must be specified.
     * @param stage - The type of the new version.
     * @param url - URL of the update.
     */
    update(stage, url) {
        return this.rpc('Update', {
            stage,
            url,
        });
    }
    /**
     * Requests a factory reset of the device.
     */
    factoryReset() {
        return this.rpc('FactoryReset');
    }
    /**
     * Requests that the device's WiFi configuration is reset.
     */
    resetWiFiConfig() {
        return this.rpc('ResetWiFiConfig');
    }
    /**
     * Requests a reboot of the device.
     * @param delay_ms - A delay until the device reboots, in milliseconds. The
     * minimum delay is 500 ms.
     */
    reboot(delay_ms) {
        return this.rpc('Reboot', {
            delay_ms,
        });
    }
    /**
     * Sets the authentication details (password) for the device.
     * @param password - The new password. Set to `null` to disable.
     */
    setAuth(password) {
        const user = 'admin';
        const hash = password === null ? null : crypto_1.default.createHash('sha256')
            .update(`${user}:${this.device.id}:${password}`)
            .digest('hex');
        return this.rpc('SetAuth', {
            user,
            realm: this.device.id,
            ha1: hash,
        });
    }
    /**
     * Uploads a custom certificate authority (CA) PEM bundle.
     * @param data - Contents of the PEM file (`null` to remove the existing file).
     * @param append - Whether more data will be appended in a subsequent call.
     */
    putUserCa(data, append) {
        return this.rpc('PutUserCA', {
            data,
            append,
        });
    }
}
exports.ShellyService = ShellyService;
//# sourceMappingURL=shelly.js.map