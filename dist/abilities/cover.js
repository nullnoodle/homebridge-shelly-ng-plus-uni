"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverAbility = void 0;
const base_1 = require("./base");
const names = {
    'door': 'Door',
    'window': 'Window',
    'windowCovering': 'Window Covering',
};
class CoverAbility extends base_1.Ability {
    /**
     * @param component - The cover component to control.
     */
    constructor(component, type = 'window') {
        super(`${names[type]} ${component.id + 1}`, `${type}-${component.id}`);
        this.component = component;
        this.type = type;
    }
    get serviceClass() {
        if (this.type === 'door') {
            return this.Service.Door;
        }
        else if (this.type === 'windowCovering') {
            return this.Service.WindowCovering;
        }
        return this.Service.Window;
    }
    /**
     * The current state of the cover.
     */
    get positionState() {
        const state = this.component.state;
        if (state === 'opening') {
            return this.Characteristic.PositionState.INCREASING;
        }
        else if (state === 'closing') {
            return this.Characteristic.PositionState.DECREASING;
        }
        return this.Characteristic.PositionState.STOPPED;
    }
    /**
     * The current position of the cover.
     */
    get currentPosition() {
        var _a;
        return (_a = this.component.current_pos) !== null && _a !== void 0 ? _a : 0;
    }
    /**
     * The target position that the cover is moving towards.
     */
    get targetPosition() {
        var _a;
        return (_a = this.component.target_pos) !== null && _a !== void 0 ? _a : this.currentPosition;
    }
    initialize() {
        // abort if this cover hasn't been calibrated
        if (this.component.pos_control !== true) {
            this.log.warn('Only calibrated covers are supported.');
            return;
        }
        // set the initial values
        this.service
            .setCharacteristic(this.Characteristic.PositionState, this.positionState)
            .setCharacteristic(this.Characteristic.CurrentPosition, this.currentPosition)
            .setCharacteristic(this.Characteristic.TargetPosition, this.targetPosition);
        // listen for commands from HomeKit
        this.service.getCharacteristic(this.Characteristic.TargetPosition)
            .onSet(this.targetPositionSetHandler.bind(this));
        // listen for updates from the device
        this.component
            .on('change:state', this.stateChangeHandler, this)
            .on('change:current_pos', this.currentPosChangeHandler, this)
            .on('change:target_pos', this.targetPosChangeHandler, this);
    }
    detach() {
        this.component
            .off('change:state', this.stateChangeHandler, this)
            .off('change:current_pos', this.currentPosChangeHandler, this)
            .off('change:target_pos', this.targetPosChangeHandler, this);
    }
    /**
     * Handles changes to the TargetPosition characteristic.
     */
    async targetPositionSetHandler(value) {
        if (value === this.component.target_pos) {
            return;
        }
        try {
            await this.component.goToPosition(value);
        }
        catch (e) {
            this.log.error('Failed to set target position:', e instanceof Error ? e.message : e);
            throw -70402 /* this.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE */;
        }
    }
    /**
     * Handles changes to the `state` property.
     */
    stateChangeHandler() {
        this.service.getCharacteristic(this.Characteristic.PositionState)
            .updateValue(this.positionState);
    }
    /**
     * Handles changes to the `current_pos` property.
     */
    currentPosChangeHandler() {
        this.service.getCharacteristic(this.Characteristic.CurrentPosition)
            .updateValue(this.currentPosition);
    }
    /**
     * Handles changes to the `target_pos` property.
     */
    targetPosChangeHandler() {
        this.service.getCharacteristic(this.Characteristic.TargetPosition)
            .updateValue(this.targetPosition);
    }
}
exports.CoverAbility = CoverAbility;
//# sourceMappingURL=cover.js.map