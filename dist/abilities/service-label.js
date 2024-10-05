"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLabelAbility = void 0;
const base_1 = require("./base");
class ServiceLabelAbility extends base_1.Ability {
    /**
     * @param namespace - The naming schema for the accessory.
     */
    constructor(namespace = 'arabicNumerals') {
        super();
        this.namespace = namespace;
    }
    get serviceClass() {
        return this.Service.ServiceLabel;
    }
    initialize() {
        const SLN = this.Characteristic.ServiceLabelNamespace;
        // set the namespace
        this.service.setCharacteristic(SLN, this.namespace === 'dots' ? SLN.DOTS : SLN.ARABIC_NUMERALS);
    }
    detach() {
        // nothing to detach
    }
}
exports.ServiceLabelAbility = ServiceLabelAbility;
//# sourceMappingURL=service-label.js.map