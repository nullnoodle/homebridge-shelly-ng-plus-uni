"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const base_1 = require("./base");
/**
 * Handles the input of a device.
 */
class Input extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Input', device, id);
        /**
         * State of the input (null if stateless).
         */
        this.state = null;
    }
    handleEvent(event) {
        switch (event.event) {
            case 'btn_down':
                this.emit('buttonDown');
                break;
            case 'btn_up':
                this.emit('buttonUp');
                break;
            case 'single_push':
                this.emit('singlePush');
                break;
            case 'double_push':
                this.emit('doublePush');
                break;
            case 'long_push':
                this.emit('longPush');
                break;
            default:
                super.handleEvent(event);
        }
    }
}
__decorate([
    base_1.characteristic
], Input.prototype, "state", void 0);
exports.Input = Input;
//# sourceMappingURL=input.js.map