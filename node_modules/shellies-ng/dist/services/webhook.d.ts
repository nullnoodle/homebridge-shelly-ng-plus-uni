import { Device } from '../devices';
import { Service } from './base';
export interface WebhookEventType {
    attrs?: Array<{
        name: string;
        type: 'boolean' | 'number' | 'string';
        desc: string;
    }>;
}
export interface WebhookSupportedResponse {
    hook_types?: string[];
    types?: {
        [name: string]: WebhookEventType;
    };
}
export interface Webhook {
    id?: number;
    cid: number;
    enable: boolean;
    event: string;
    name: string | null;
    ssl_ca?: '*' | 'user_ca.pem' | '' | null;
    urls: string[];
    active_between?: string[] | null;
    condition?: string | null;
}
export interface WebhookListResponse {
    hooks: Webhook[];
    rev: number;
}
export interface WebhookCreateResponse {
    id: number;
    rev: number;
}
export interface WebhookUpdateResponse {
    rev: number;
}
export interface WebhookDeleteResponse {
    rev: number;
}
/**
 * The Webhook service allows Shelly devices to send HTTP requests triggered by events.
 */
export declare class WebhookService extends Service {
    constructor(device: Device);
    /**
     * Lists all supported event types.
     */
    listSupported(): PromiseLike<WebhookSupportedResponse>;
    /**
     * Lists all existing webhooks.
     */
    list(): PromiseLike<WebhookListResponse>;
    /**
     * Creates a new webhook.
     * @param hook - The webhook to add.
     */
    create(hook: Partial<Webhook>): PromiseLike<WebhookCreateResponse>;
    /**
     * Updates an existing webhook.
     * @param hook - The webhook to update.
     */
    update(hook: Partial<Webhook>): PromiseLike<WebhookUpdateResponse>;
    /**
     * Deletes a webhook.
     * @param id - ID of the webhook to delete.
     */
    delete(id: number): PromiseLike<WebhookDeleteResponse>;
    /**
     * Deletes all existing webhooks.
     */
    deleteAll(): PromiseLike<WebhookDeleteResponse>;
}
//# sourceMappingURL=webhook.d.ts.map