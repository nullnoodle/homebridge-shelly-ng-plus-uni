import { Component } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';
export interface SystemFirmwareUpdate {
    stable?: {
        version: string;
    };
    beta?: {
        version: string;
    };
}
export interface SystemWakeupReason {
    boot: 'poweron' | 'software_restart' | 'deepsleep_wake' | 'internal' | 'unknown';
    cause: 'button' | 'usb' | 'periodic' | 'status_update' | 'undefined';
}
export interface SystemAttributes {
    mac: string;
    restart_required: boolean;
    time: string;
    unixtime: number;
    uptime: number;
    ram_size: number;
    ram_free: number;
    fs_size: number;
    fs_free: number;
    cfg_rev: number;
    kvs_rev: number;
    schedule_rev?: number;
    webhook_rev?: number;
    available_updates: SystemFirmwareUpdate;
    wakeup_reason?: SystemWakeupReason;
}
export interface SystemConfig {
    device: {
        name: string;
        eco_mode: boolean;
        mac: string;
        fw_id: string;
        profile?: string;
        discoverable: boolean;
    };
    location: {
        tz: string | null;
        lat: number | null;
        lon: number | null;
    };
    debug: {
        mqtt: {
            enable: boolean;
        };
        websocket: {
            enable: boolean;
        };
        udp: {
            addr: string | null;
        };
    };
    ui_data: Record<string, unknown>;
    rpc_udp: {
        dst_addr: string | null;
        listen_port: number | null;
    };
    sntp: {
        server: string;
    };
    sleep?: {
        wakeup_period: number;
    };
    cfg_rev: number;
}
/**
 * Handles the system services of a device.
 */
export declare class System extends Component<SystemAttributes, SystemConfig> implements SystemAttributes {
    /**
     * MAC address of the device.
     */
    readonly mac: string;
    /**
     * true if a restart is required, false otherwise.
     */
    readonly restart_required: boolean;
    /**
     * Local time in the current timezone (HH:MM).
     */
    readonly time: string;
    /**
     * Current time in UTC as a UNIX timestamp.
     */
    readonly unixtime: number;
    /**
     * Time in seconds since last reboot.
     */
    readonly uptime: number;
    /**
     * Total RAM, in bytes.
     */
    readonly ram_size: number;
    /**
     * Available RAM, in bytes.
     */
    readonly ram_free: number;
    /**
     * File system total size, in bytes.
     */
    readonly fs_size: number;
    /**
     * File system available size, in bytes.
     */
    readonly fs_free: number;
    /**
     * Configuration revision number.
     */
    readonly cfg_rev: number;
    /**
     * KVS (Key-Value Store) revision number.
     */
    readonly kvs_rev: number;
    /**
     * Schedule revision number (present if schedules are enabled).
     */
    readonly schedule_rev: number | undefined;
    /**
     * Webhook revision number (present if schedules are enabled).
     */
    readonly webhook_rev: number | undefined;
    /**
     * Available firmware updates, if any.
     */
    readonly available_updates: SystemFirmwareUpdate;
    /**
     * Information about boot type and cause (only for battery-operated devices).
     */
    readonly wakeup_reason: SystemWakeupReason | undefined;
    constructor(device: Device);
    handleEvent(event: RpcEvent): void;
}
//# sourceMappingURL=system.d.ts.map