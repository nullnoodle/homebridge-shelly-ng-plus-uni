"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const base_1 = require("./base");
/**
 * The Webhook service allows Shelly devices to send HTTP requests triggered by events.
 */
class WebhookService extends base_1.Service {
    constructor(device) {
        super('Webhook', device);
    }
    /**
     * Lists all supported event types.
     */
    listSupported() {
        return this.rpc('ListSupported');
    }
    /**
     * Lists all existing webhooks.
     */
    list() {
        return this.rpc('List');
    }
    /**
     * Creates a new webhook.
     * @param hook - The webhook to add.
     */
    create(hook) {
        return this.rpc('Create', { ...hook });
    }
    /**
     * Updates an existing webhook.
     * @param hook - The webhook to update.
     */
    update(hook) {
        return this.rpc('Update', { ...hook });
    }
    /**
     * Deletes a webhook.
     * @param id - ID of the webhook to delete.
     */
    delete(id) {
        return this.rpc('Delete', {
            id,
        });
    }
    /**
     * Deletes all existing webhooks.
     */
    deleteAll() {
        return this.rpc('DeleteAll');
    }
}
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.js.map