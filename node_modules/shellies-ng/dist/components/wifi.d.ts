import { Component } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';
export interface WiFiAttributes {
    sta_ip: string | null;
    status: 'disconnected' | 'connecting' | 'connected' | 'got ip';
    ssid: string | null;
    rssi: number;
    ap_client_count?: number;
}
export interface WiFiStationConfig {
    ssid: string | null;
    pass?: string | null;
    is_open: boolean;
    enable: boolean;
    ipv4mode: 'dhcp' | 'static';
    ip: string | null;
    netmask: string | null;
    gw: string | null;
    nameserver: string | null;
}
export interface WiFiConfig {
    ap: {
        ssid: string | null;
        is_open: boolean;
        enable: boolean;
        range_extender?: {
            enable: boolean;
        };
    };
    sta: WiFiStationConfig;
    sta1: WiFiStationConfig;
    roam: {
        rssi_thr: number;
        interval: number;
    };
}
export interface WiFiScanResponse {
    results: Array<{
        ssid: string | null;
        bssid: string;
        auth: 0 | 1 | 2 | 3 | 4 | 5;
        channel: number;
        rssi: number;
    }>;
}
export interface WiFiListApClientsResponse {
    ts: number | null;
    ap_clients: Array<{
        mac: string;
        ip: string;
        ip_static: boolean;
        mport: number;
        since: number;
    }>;
}
/**
 * Handles the WiFi services of a device.
 */
export declare class WiFi extends Component<WiFiAttributes, WiFiConfig> implements WiFiAttributes {
    /**
     * IP address of the device.
     */
    readonly sta_ip: string | null;
    /**
     * Status of the connection.
     */
    readonly status: 'disconnected' | 'connecting' | 'connected' | 'got ip';
    /**
     * SSID of the network.
     */
    readonly ssid: string | null;
    /**
     * Signal strength, in dBms.
     */
    readonly rssi: number;
    /**
     * Number of clients connected to the access point.
     */
    readonly ap_client_count: number | undefined;
    constructor(device: Device);
    /**
     * Retrieves a list of available networks.
     */
    scan(): PromiseLike<WiFiScanResponse>;
    /**
     * Returns a list of clients currently connected to the device's access point.
     */
    listApClients(): PromiseLike<WiFiListApClientsResponse>;
    handleEvent(event: RpcEvent): void;
}
//# sourceMappingURL=wifi.d.ts.map