"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdnsDeviceDiscoverer = void 0;
const multicast_dns_1 = __importDefault(require("multicast-dns"));
const os_1 = __importDefault(require("os"));
const base_1 = require("./base");
/**
 * Default multicast-dns options.
 */
const DEFAULT_MDNS_OPTIONS = {
    interface: undefined,
};
/**
 * The service name that Shelly devices use to advertise themselves.
 */
const SERVICE_NAME = '_shelly._tcp.local';
/**
 * A service that can discover Shelly devices using mDNS.
 */
class MdnsDeviceDiscoverer extends base_1.DeviceDiscoverer {
    /**
     * @param mdnsOptions - Options for the multicast-dns library.
     */
    constructor(mdnsOptions) {
        super();
        /**
         * A reference to the multicast-dns library.
         */
        this.mdns = null;
        // store the multicast-dns options, with default values
        this.mdnsOptions = { ...DEFAULT_MDNS_OPTIONS, ...(mdnsOptions || {}) };
    }
    /**
     * Makes this service start listening for new Shelly devices.
     */
    async start() {
        if (this.mdns !== null) {
            return;
        }
        this.mdns = (0, multicast_dns_1.default)({
            interface: this.getNetworkInterface(this.mdnsOptions.interface),
        });
        this.mdns
            .on('response', (response) => this.handleResponse(response))
            .on('error', (error) => this.emit('error', error))
            .on('warning', (error) => this.emit('error', error));
        await this.waitUntilReady();
        await this.sendQuery();
    }
    /**
     * Validates the given network interface name or address.
     * @param iface - An interface name or address.
     * @returns If a valid interface name is given, the address for that interface
     * is returned. If a valid address is given, that same address is returned.
     * @throws Throws an error if the given name or address could not be found.
     */
    getNetworkInterface(iface) {
        if (!iface) {
            // skip if no interface has been specified
            return undefined;
        }
        // get all available interfaces
        const ifaces = os_1.default.networkInterfaces();
        // if an interface name has been given, return its address
        const ifc = ifaces[iface];
        if (ifc && ifc.length > 0) {
            // return the first address
            return ifc[0].address;
        }
        // otherwise, go through each interface and see if there is one with the
        // given address
        for (const i in ifaces) {
            const ifc = ifaces[i];
            if (!ifc) {
                continue;
            }
            for (const ii of ifc) {
                if (ii.address === iface) {
                    // address found, so it's valid
                    return ii.address;
                }
            }
        }
        // the given value doesn't match any available interface name or address
        throw new Error(`Invalid network interface "${iface}"`);
    }
    /**
     * Returns a promise that will resolve once the mDNS socket is ready.
     */
    waitUntilReady() {
        return new Promise((resolve) => {
            this.mdns.once('ready', resolve);
        });
    }
    /**
     * Queries for Shelly devices.
     */
    sendQuery() {
        return new Promise((resolve, reject) => {
            this.mdns.query(SERVICE_NAME, 'PTR', (error) => {
                if (error !== null) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     * Makes this service stop searching for new Shelly devices.
     */
    async stop() {
        if (this.mdns === null) {
            return;
        }
        await this.destroy();
        this.mdns = null;
    }
    /**
     * Destroys the mDNS instance, closing the socket.
     */
    destroy() {
        return new Promise((resolve) => {
            this.mdns.destroy(resolve);
        });
    }
    /**
     * Handles mDNS response packets by parsing them and emitting `discover`
     * events.
     * @param response - The response packets.
     */
    handleResponse(response) {
        let deviceId = null;
        // see if this response contains our requested service
        for (const a of response.answers) {
            if (a.type === 'PTR' && a.name === SERVICE_NAME && a.data) {
                // this is the right service
                // get the device ID
                deviceId = a.data.split('.', 1)[0];
                break;
            }
        }
        // skip this response if it doesn't contain our requested service
        if (!deviceId) {
            return;
        }
        let ipAddress = null;
        // find the device IP address among the answers
        for (const a of response.answers) {
            if (a.type === 'A') {
                ipAddress = a.data;
            }
        }
        if (ipAddress) {
            this.handleDiscoveredDevice({
                deviceId,
                hostname: ipAddress,
            });
        }
    }
}
exports.MdnsDeviceDiscoverer = MdnsDeviceDiscoverer;
//# sourceMappingURL=mdns.js.map