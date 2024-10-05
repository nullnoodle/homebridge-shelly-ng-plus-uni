"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentWithId = exports.Component = exports.ComponentBase = exports.characteristic = void 0;
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const eventemitter3_1 = __importDefault(require("eventemitter3"));
/**
 * Property decorator used to label properties as characteristics.
 * @param target - The prototype of the component class that the property belongs to.
 * @param propertyName - The name of the property.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const characteristic = (target, propertyName) => {
    // make sure the given prototype has an array of properties
    if (!Object.prototype.hasOwnProperty.call(target, '_characteristicProps')) {
        target._characteristicProps = new Array();
    }
    // get the array of properties
    const props = target._characteristicProps;
    // add this property to the array
    props.push(propertyName);
};
exports.characteristic = characteristic;
/**
 * Base class for all device components.
 */
class ComponentBase extends eventemitter3_1.default {
    /**
     * @param name - The name of this component. Used when making RPCs.
     * @param device - The device that owns this component.
     * @param key - The key used to identify the component in status updates etc. If `null`, the component name
     * in lower case letters will be used.
     */
    constructor(name, device, key = null) {
        super();
        this.name = name;
        this.device = device;
        this._characteristics = null;
        this.key = key !== null ? key : name.toLowerCase();
    }
    /**
     * A list of all characteristics.
     */
    get characteristics() {
        if (this._characteristics === null) {
            // construct an array of properties stored by the @characteristic property decorator
            const props = new Array();
            let proto = Object.getPrototypeOf(this);
            // traverse the prototype chain and collect all properties
            while (proto !== null) {
                if (Object.prototype.hasOwnProperty.call(proto, '_characteristicProps')) {
                    props.push(...proto._characteristicProps);
                }
                proto = Object.getPrototypeOf(proto);
            }
            // store the list
            this._characteristics = new Set(props);
        }
        return this._characteristics;
    }
    /**
     * Updates the characteristics of the component.
     * This method will emit `change` events for all characteristics that are
     * updated.
     * @param data - A data object that contains characteristics and their values.
     */
    update(data) {
        const cs = this.characteristics;
        const changed = new Set();
        if (!cs) {
            // abort if we don't have any characteristics
            return;
        }
        // loop through each of our characteristics
        for (const c of cs) {
            if (!Object.prototype.hasOwnProperty.call(data, c)) {
                // ignore if this characteristic is not in the data set
                continue;
            }
            if (typeof data[c] === 'object' && this[c]) {
                // if this is an object, we need to check for deep equality
                if ((0, fast_deep_equal_1.default)(data[c], this[c])) {
                    // skip if nothing has changed
                    continue;
                }
                // copy the attributes of the characteristic
                Object.assign(this[c], data[c]);
            }
            else {
                if (data[c] === this[c]) {
                    // skip if the value is unchanged
                    continue;
                }
                // assign the new value to our characteristic
                this[c] = data[c];
            }
            // add it to the list of changed characteristics
            changed.add(c);
        }
        // emit all change events after the characteristics have been updated
        for (const c of changed) {
            this.emit('change', c, this[c]);
            this.emit('change:' + c, this[c]);
        }
    }
    /**
     * Handles events received from the device RPC handler.
     * Subclasses should override this method to handle their specific events.
     * @param event - The event that has occurred.
     */
    handleEvent(event) {
        if (event.event === 'config_changed') {
            this.emit('configChange', event.cfg_rev, event.restart_required);
        }
    }
    /**
     * Shorthand method for making an RPC.
     */
    rpc(method, params) {
        return this.device.rpcHandler.request(`${this.name}.${method}`, params);
    }
}
exports.ComponentBase = ComponentBase;
/**
 * Defines a set of methods common for (almost) all device components.
 */
class Component extends ComponentBase {
    /**
     * Retrieves the status of this component.
     */
    getStatus() {
        return this.rpc('GetStatus');
    }
    /**
     * Retrieves the configuration of this component.
     */
    getConfig() {
        return this.rpc('GetConfig');
    }
    /**
     * Requests changes in the configuration of this component.
     * @param config - The configuration options to set.
     */
    setConfig(config) {
        return this.rpc('SetConfig', {
            config,
        });
    }
}
exports.Component = Component;
/**
 * Base class for components with an ID.
 */
class ComponentWithId extends Component {
    /**
     * @param name - The name of this component. Used when making RPCs.
     * @param device - The device that owns this component.
     * @param id - ID of this component.
     * @param key - The key used to identify the component in status updates etc. If `null`, the component name
     * in lower case letters will be used. The component ID will be appended to this key.
     */
    constructor(name, device, id = 0, key = null) {
        super(name, device, (key !== null ? key : name.toLowerCase()) + ':' + id);
        this.id = id;
    }
    /**
     * Retrieves the status of this component.
     */
    getStatus() {
        return this.rpc('GetStatus', {
            id: this.id,
        });
    }
    /**
     * Retrieves the configuration of this component.
     */
    getConfig() {
        return this.rpc('GetConfig', {
            id: this.id,
        });
    }
    /**
     * Requests changes in the configuration of this component.
     * @param config - The configuration options to set.
     */
    setConfig(config) {
        return this.rpc('SetConfig', {
            id: this.id,
            config,
        });
    }
}
exports.ComponentWithId = ComponentWithId;
//# sourceMappingURL=base.js.map