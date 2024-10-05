import { Component } from './base';
import { Device } from '../devices';
export interface BluetoothLowEnergyAttributes {
}
export interface BluetoothLowEnergyConfig {
    enable: boolean;
}
/**
 * Handles the Bluetooth services of a device.
 */
export declare class BluetoothLowEnergy extends Component<BluetoothLowEnergyAttributes, BluetoothLowEnergyConfig> implements BluetoothLowEnergyAttributes {
    constructor(device: Device);
}
//# sourceMappingURL=bluetooth-low-energy.d.ts.map