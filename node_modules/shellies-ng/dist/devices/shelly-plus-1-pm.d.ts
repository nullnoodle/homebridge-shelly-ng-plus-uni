import { Device } from './base';
import { BluetoothLowEnergy, Cloud, Input, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../components';
export declare class ShellyPlus1Pm extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly input0: Input;
    readonly switch0: Switch;
    readonly script: Script;
}
export declare class ShellyPlus1PmUl extends ShellyPlus1Pm {
    static readonly model: string;
}
//# sourceMappingURL=shelly-plus-1-pm.d.ts.map