import { Device } from './base';
import { BluetoothLowEnergy, Cloud, Input, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../components';
export declare class ShellyPro1Pm extends Device {
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
export declare class ShellyPro1PmRev1 extends ShellyPro1Pm {
    static readonly model: string;
}
export declare class ShellyPro1PmRev2 extends ShellyPro1PmRev1 {
    static readonly model: string;
}
//# sourceMappingURL=shelly-pro-1-pm.d.ts.map