import { Device } from './base';
import { BluetoothLowEnergy, Cloud, Input, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../components';
export declare class ShellyPro1 extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly input0: Input;
    readonly input1: Input;
    readonly switch0: Switch;
    readonly script: Script;
}
export declare class ShellyPro1Rev1 extends ShellyPro1 {
    static readonly model: string;
}
export declare class ShellyPro1Rev2 extends ShellyPro1Rev1 {
    static readonly model: string;
}
//# sourceMappingURL=shelly-pro-1.d.ts.map