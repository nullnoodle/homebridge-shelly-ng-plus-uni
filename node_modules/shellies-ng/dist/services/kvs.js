"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KvsService = void 0;
const base_1 = require("./base");
/**
 * The KVS (Key-Value Store) service provides a basic persistent storage of key-value pairs.
 */
class KvsService extends base_1.Service {
    constructor(device) {
        super('KVS', device);
    }
    /**
     * Adds a new key-value pair to the store or updates an existing one.
     * @param key - The key to add or update.
     * @param value - Value for the key.
     * @param etag - Generated hash uniquely identifying the key-value pair.
     */
    set(key, value, etag) {
        return this.rpc('Set', {
            key,
            value,
            etag,
        });
    }
    /**
     * Returns the value stored and etag for a given key.
     * @param key - The key to lookup.
     */
    get(key) {
        return this.rpc('Get', {
            key,
        });
    }
    /**
     * Returns the full information stored for items in the store based on an optional key matching parameter.
     * @param match - Pattern against which keys are matched.
     */
    getMany(match) {
        return this.rpc('GetMany', {
            match,
        });
    }
    /**
     * Returns a list of existing keys and etags based on an optional match parameter.
     * @param match - Pattern against which keys are matched.
     */
    list(match) {
        return this.rpc('List', {
            match,
        });
    }
    /**
     * Deletes an existing key from the store.
     * @param key - The key to delete.
     * @param etag - Generated hash uniquely identifying the key-value pair.
     */
    delete(key, etag) {
        return this.rpc('Delete', {
            key,
            etag,
        });
    }
}
exports.KvsService = KvsService;
//# sourceMappingURL=kvs.js.map