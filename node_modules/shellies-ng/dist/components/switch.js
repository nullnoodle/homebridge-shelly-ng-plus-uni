"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const base_1 = require("./base");
/**
 * Represents a switch (relay) of a device.
 */
class Switch extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Switch', device, id);
        /**
         * Source of the last command.
         */
        this.source = '';
        /**
         * true if the output channel is currently on, false otherwise.
         */
        this.output = false;
        /**
         * Information about the temperature.
         */
        this.temperature = {
            tC: null,
            tF: null,
        };
    }
    /**
     * Toggles the switch.
     */
    toggle() {
        return this.rpc('Toggle', {
            id: this.id,
        });
    }
    /**
     * Sets the output of the switch.
     * @param on - Whether to switch on or off.
     * @param toggle_after - Flip-back timer, in seconds.
     */
    set(on, toggle_after) {
        return this.rpc('Set', {
            id: this.id,
            on,
            toggle_after,
        });
    }
}
__decorate([
    base_1.characteristic
], Switch.prototype, "source", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "output", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "timer_started_at", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "timer_duration", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "apower", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "current", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "pf", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "aenergy", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "temperature", void 0);
__decorate([
    base_1.characteristic
], Switch.prototype, "errors", void 0);
exports.Switch = Switch;
//# sourceMappingURL=switch.js.map