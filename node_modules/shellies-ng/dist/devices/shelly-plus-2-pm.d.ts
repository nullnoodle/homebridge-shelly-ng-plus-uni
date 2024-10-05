import { MultiProfileDevice } from './base';
import { BluetoothLowEnergy, Cloud, Cover, Input, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../components';
export declare class ShellyPlus2Pm extends MultiProfileDevice {
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
export declare class ShellyPlus2PmRev1 extends ShellyPlus2Pm {
    static readonly model: string;
}
//# sourceMappingURL=shelly-plus-2-pm.d.ts.map