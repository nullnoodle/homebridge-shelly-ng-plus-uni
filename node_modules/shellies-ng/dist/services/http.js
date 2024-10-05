"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const base_1 = require("./base");
/**
 * The HTTP service enables sending HTTP requests from Shelly devices.
 */
class HttpService extends base_1.Service {
    constructor(device) {
        super('HTTP', device);
    }
    /**
     * Sends an HTTP GET request.
     * @param url - The URL to send the request to.
     * @param timeout - Timeout, in seconds.
     * @param ssl_ca - The certificate authority to use for HTTPS requests.
     */
    get(url, timeout, ssl_ca) {
        return this.rpc('GET', {
            url,
            timeout,
            ssl_ca,
        });
    }
    /**
     * Sends an HTTP POST request.
     * Either `body` or `body_b64` must be specified.
     * @param url - The URL to send the request to.
     * @param body - The request body.
     * @param body_b64 - The request body (base64 encoded).
     * @param content_type - The type of content being sent.
     * @param timeout - Timeout, in seconds.
     * @param ssl_ca - The certificate authority to use for HTTPS requests.
     */
    post(url, body, body_b64, content_type = 'application/json', timeout, ssl_ca) {
        return this.rpc('POST', {
            url,
            body,
            body_b64,
            content_type,
            timeout,
            ssl_ca,
        });
    }
    /**
     * Sends an HTTP request.
     * Either `body` or `body_b64` must be specified for POST and PUT requests.
     * @param method - The HTTP method to use.
     * @param url - The URL to send the request to.
     * @param body - The request body.
     * @param body_b64 - The request body (base64 encoded).
     * @param headers - User supplied request headers.
     * @param timeout - Timeout, in seconds.
     * @param ssl_ca - The certificate authority to use for HTTPS requests.
     */
    request(method, url, body, body_b64, headers, timeout, ssl_ca) {
        return this.rpc('Request', {
            method,
            url,
            body,
            body_b64,
            headers,
            timeout,
            ssl_ca,
        });
    }
}
exports.HttpService = HttpService;
//# sourceMappingURL=http.js.map