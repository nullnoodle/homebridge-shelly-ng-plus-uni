import { Device } from './base';
import { BluetoothLowEnergy, Cloud, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../components';
export declare class ShellyPlusPlugUs extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly switch0: Switch;
    readonly script: Script;
}
//# sourceMappingURL=shelly-plus-plug-us.d.ts.map