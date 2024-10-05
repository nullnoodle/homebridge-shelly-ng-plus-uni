import { MultiProfileDevice } from './base';
import { BluetoothLowEnergy, Cloud, Cover, Input, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../components';
export declare class ShellyPro2Pm extends MultiProfileDevice {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly cover0: Cover;
    readonly input0: Input;
    readonly input1: Input;
    readonly switch0: Switch;
    readonly switch1: Switch;
    readonly script: Script;
}
export declare class ShellyPro2PmRev1 extends ShellyPro2Pm {
    static readonly model: string;
}
export declare class ShellyPro2PmRev2 extends ShellyPro2PmRev1 {
    static readonly model: string;
}
//# sourceMappingURL=shelly-pro-2-pm.d.ts.map