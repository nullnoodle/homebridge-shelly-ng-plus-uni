"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiProfileDevice = exports.Device = exports.component = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const components_1 = require("../components");
const services_1 = require("../services");
/**
 * Property decorator used to label properties as components.
 * @param target - The prototype of the device class that the property belongs to.
 * @param propertyName - The name of the property.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const component = (target, propertyName) => {
    // make sure the given prototype has an array of properties
    if (!Object.prototype.hasOwnProperty.call(target, '_componentProps')) {
        target._componentProps = new Array();
    }
    // get the array of properties
    const props = target._componentProps;
    // add this property to the array
    props.push(propertyName);
};
exports.component = component;
/**
 * Base class for all devices.
 */
class Device extends eventemitter3_1.default {
    /**
     * @param info - Information about this device.
     * @param rpcHandler - Used to make remote procedure calls.
     */
    constructor(info, rpcHandler) {
        super();
        this.rpcHandler = rpcHandler;
        /**
         * This device's Shelly service.
         */
        this.shelly = new services_1.ShellyService(this);
        /**
         * This device's Schedule service.
         */
        this.schedule = new services_1.ScheduleService(this);
        /**
         * This device's Webhook service.
         */
        this.webhook = new services_1.WebhookService(this);
        /**
         * This device's HTTP service.
         */
        this.http = new services_1.HttpService(this);
        /**
         * This device's KVS service.
         */
        this.kvs = new services_1.KvsService(this);
        this.system = new components_1.System(this);
        this._components = null;
        this.id = info.id;
        this.macAddress = info.mac;
        this.firmware = {
            id: info.fw_id,
            version: info.ver,
        };
        this._model = info.model;
        // handle status updates
        rpcHandler.on('statusUpdate', this.statusUpdateHandler, this);
        // handle events
        rpcHandler.on('event', this.eventHandler, this);
    }
    /**
     * Registers a device class, so that it can later be found based on its device model
     * using the `Device.getClass()` method.
     * @param cls - A subclass of `Device`.
     */
    static registerClass(cls) {
        const model = cls.model.toUpperCase();
        // make sure it's not already registered
        if (Device.subclasses.has(model)) {
            throw new Error(`A device class for ${model} has already been registered`);
        }
        // add it to the list
        Device.subclasses.set(model, cls);
    }
    /**
     * Returns the device class for the given device model, if one has been registered.
     * @param model - The model designation to lookup.
     */
    static getClass(model) {
        return Device.subclasses.get(model.toUpperCase());
    }
    /**
     * The model designation of this device.
     */
    get model() {
        return this._model || this.constructor.model;
    }
    /**
     * A human-friendly name of the device model.
     */
    get modelName() {
        return this.constructor.modelName;
    }
    /**
     * Maps component keys to property names.
     */
    get components() {
        if (this._components === null) {
            this._components = new Map();
            // construct an array of properties stored by the @component property decorator
            const props = new Array();
            let proto = Object.getPrototypeOf(this);
            // traverse the prototype chain and collect all properties
            while (proto !== null) {
                if (Object.prototype.hasOwnProperty.call(proto, '_componentProps')) {
                    props.push(...proto._componentProps);
                }
                proto = Object.getPrototypeOf(proto);
            }
            // map each component's key to its property name
            for (const p of props) {
                const cmpnt = this[p];
                if (!cmpnt) {
                    continue;
                }
                this._components.set(cmpnt.key, p);
            }
        }
        return this._components;
    }
    /**
     * Determines whether this device has a component with a given key.
     * @param key - The component key.
     */
    hasComponent(key) {
        return this.components.has(key);
    }
    /**
     * Returns the component with the given key.
     * @param key - The component key.
     */
    getComponent(key) {
        const prop = this.components.get(key);
        if (prop) {
            return this[prop];
        }
        return undefined;
    }
    /**
     * Returns a new Iterator object that contains each of the device's
     * components.
     */
    *[Symbol.iterator]() {
        for (const [key, prop] of this.components.entries()) {
            yield [key, this[prop]];
        }
    }
    /**
     * Loads the status for all of the device's components and populates their characteristics.
     */
    async loadStatus() {
        var _a;
        // retrieve the status
        const status = await this.shelly.getStatus();
        // update the components
        for (const cmpnt in status) {
            if (Object.prototype.hasOwnProperty.call(status, cmpnt) && typeof status[cmpnt] === 'object') {
                (_a = this.getComponent(cmpnt)) === null || _a === void 0 ? void 0 : _a.update(status[cmpnt]);
            }
        }
    }
    /**
     * Loads the condiguration for all of the device's components and populates their `config` properties.
     */
    async loadConfig() {
        // retrieve the config
        const config = await this.shelly.getConfig();
        // update the components
        for (const cmpnt in config) {
            if (Object.prototype.hasOwnProperty.call(config, cmpnt) && typeof config[cmpnt] === 'object') {
                const c = this.getComponent(cmpnt);
                if (c && c instanceof components_1.Component) {
                    c.config = config[cmpnt];
                }
            }
        }
    }
    /**
     * Handles 'statusUpdate' events from our RPC handler.
     */
    statusUpdateHandler(update) {
        var _a;
        // update each components
        for (const cmpnt in update) {
            if (cmpnt !== 'ts' && Object.prototype.hasOwnProperty.call(update, cmpnt) && typeof update[cmpnt] === 'object') {
                (_a = this.getComponent(cmpnt)) === null || _a === void 0 ? void 0 : _a.update(update[cmpnt]);
            }
        }
    }
    /**
     * Handles 'event' events from our RPC handler.
     */
    eventHandler(events) {
        var _a;
        // pass each event on to its corresponding component
        for (const event of events.events) {
            (_a = this.getComponent(event.component)) === null || _a === void 0 ? void 0 : _a.handleEvent(event);
        }
    }
}
/**
 * Holds all registered subclasses.
 */
Device.subclasses = new Map();
__decorate([
    exports.component
], Device.prototype, "system", void 0);
exports.Device = Device;
/**
 * Base class for devices that have multiple profiles.
 */
class MultiProfileDevice extends Device {
    /**
     * @param info - Information about this device.
     * @param rpcHandler - Used to make remote procedure calls.
     */
    constructor(info, rpcHandler) {
        var _a;
        super(info, rpcHandler);
        this.rpcHandler = rpcHandler;
        this.profile = (_a = info.profile) !== null && _a !== void 0 ? _a : '';
    }
}
exports.MultiProfileDevice = MultiProfileDevice;
//# sourceMappingURL=base.js.map