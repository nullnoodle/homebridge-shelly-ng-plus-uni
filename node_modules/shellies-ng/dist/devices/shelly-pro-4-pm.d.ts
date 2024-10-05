import { Device } from './base';
import { BluetoothLowEnergy, Cloud, Ethernet, Input, Mqtt, OutboundWebSocket, Script, Switch, Ui, WiFi } from '../components';
export declare class ShellyPro4Pm extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly ethernet: Ethernet;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly input0: Input;
    readonly input1: Input;
    readonly input2: Input;
    readonly input3: Input;
    readonly switch0: Switch;
    readonly switch1: Switch;
    readonly switch2: Switch;
    readonly switch3: Switch;
    readonly script: Script;
    readonly ui: Ui;
}
//# sourceMappingURL=shelly-pro-4-pm.d.ts.map