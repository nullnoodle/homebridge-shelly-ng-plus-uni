import { Device } from './base';
import { BluetoothLowEnergy, Cloud, Input, Mqtt, OutboundWebSocket, Script, WiFi } from '../components';
export declare class ShellyPlusI4 extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly input0: Input;
    readonly input1: Input;
    readonly input2: Input;
    readonly input3: Input;
    readonly script: Script;
}
//# sourceMappingURL=shelly-plus-i4.d.ts.map