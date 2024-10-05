"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformOptions = void 0;
const DEFAULT_MDNS_OPTIONS = {
    enable: true,
};
const DEFAULT_WEB_SOCKET_OPTIONS = {
    requestTimeout: 10,
    pingInterval: 60,
    reconnectInterval: [
        5,
        10,
        30,
        60,
        5 * 60,
        10 * 60, // 10 minutes
    ],
};
const DEFAULT_DEVICE_OPTIONS = {
    exclude: false,
    protocol: 'websocket',
};
/**
 * Handles configuration options for the platform.
 */
class PlatformOptions {
    /**
     * @param config - The platform configuration.
     */
    constructor(config) {
        var _a;
        /**
         * Device specific configuration options.
         */
        this.deviceOptions = new Map();
        // store the mDNS options (with default values)
        this.mdns = { ...DEFAULT_MDNS_OPTIONS, ...config.mdns };
        // allow websocket.reconnectInterval to be a string of comma-separated numbers
        if (typeof ((_a = config.websocket) === null || _a === void 0 ? void 0 : _a.reconnectInterval) === 'string') {
            const intervals = [];
            for (const i of config.websocket.reconnectInterval.split(',')) {
                intervals.push(parseInt(i, 10));
            }
            config.websocket.reconnectInterval = intervals;
        }
        // store the WebSocket options (with default values)
        this.websocket = { ...DEFAULT_WEB_SOCKET_OPTIONS, ...config.websocket };
        // store the device options
        if (Array.isArray(config.devices)) {
            // loop through each item and add default values
            for (const d of config.devices) {
                if (d && typeof d.id === 'string') {
                    this.deviceOptions.set(d.id.toLowerCase(), { ...DEFAULT_DEVICE_OPTIONS, ...d });
                }
            }
        }
    }
    /**
     * Return the configuration options for the device with the given ID.
     * If no options have been specified, default values will be returned.
     * @param deviceId - The device ID.
     */
    getDeviceOptions(deviceId) {
        return this.deviceOptions.get(deviceId) || DEFAULT_DEVICE_OPTIONS;
    }
}
exports.PlatformOptions = PlatformOptions;
//# sourceMappingURL=config.js.map