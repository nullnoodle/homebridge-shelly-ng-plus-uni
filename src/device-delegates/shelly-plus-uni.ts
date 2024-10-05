import {
  ShellyPlusUni,
} from 'shellies-ng';


import { DeviceDelegate } from './base';

/**
 * Handles Shelly Plus Uni devices.
 */
export class ShellyPlusUniDelegate extends DeviceDelegate {
  protected setup() {
    const d = this.device as ShellyPlusUni;

    this.addSwitch(d.switch0, { single: true });
    // this.addSwitch(d.switch1, { single: true });
  }
}

DeviceDelegate.registerDelegate(
  ShellyPlusUniDelegate,
  ShellyPlusUni,
);
