import { Component } from './base';
import { Device } from '../devices';
export interface EthernetAttributes {
    ip: string | null;
}
export interface EthernetConfig {
    enable: boolean;
    ipv4mode: 'dhcp' | 'static';
    ip: string | null;
    netmask: string | null;
    gw: string | null;
    nameserver: string | null;
}
/**
 * Handles the Ethernet services of a device.
 */
export declare class Ethernet extends Component<EthernetAttributes, EthernetConfig> implements EthernetAttributes {
    /**
     * IP address of the device.
     */
    readonly ip: string | null;
    constructor(device: Device);
}
//# sourceMappingURL=ethernet.d.ts.map