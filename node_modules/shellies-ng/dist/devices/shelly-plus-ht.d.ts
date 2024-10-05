import { Device } from './base';
import { BluetoothLowEnergy, Cloud, DevicePower, HtUi, Humidity, Mqtt, OutboundWebSocket, Temperature, WiFi } from '../components';
export declare class ShellyPlusHT extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly temperature0: Temperature;
    readonly humidity0: Humidity;
    readonly devicePower0: DevicePower;
    readonly htUi: HtUi;
}
//# sourceMappingURL=shelly-plus-ht.d.ts.map