"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONRPCClientWithAuthentication = void 0;
const crypto_1 = __importDefault(require("crypto"));
const json_rpc_2_0_1 = require("json-rpc-2.0");
/**
 * Extends JSONRPCClient to seamlessly handle authentication.
 */
class JSONRPCClientWithAuthentication extends json_rpc_2_0_1.JSONRPCClient {
    /**
     * @param password - The password to authenticate with.
     */
    constructor(send, password) {
        super(send);
        this.password = password;
        /**
         * Holds the current request ID. This number is incremented for each new request.
         */
        this.requestId = 0;
    }
    requestAdvanced(requests, clientParams) {
        // call requestWithAuthentication() for each request
        const promises = (Array.isArray(requests) ? requests : [requests]).map((r) => this.requestWithAuthentication(r, clientParams));
        return Array.isArray(requests) ? Promise.all(promises) : promises[0];
    }
    /**
     * Handles 401 errors by parsing the authentication challenge, generating an authentication response
     * and supplying that response with each subsequent request.
     */
    async requestWithAuthentication(request, clientParams) {
        // construct a request object with autentication parameters
        const req = { auth: this.auth, ...request };
        // send the request
        const response = await super.requestAdvanced(req, clientParams);
        // handle errors
        if (response.error) {
            // an error code of 401 means this request needs to be authenticated
            if (response.error.code === 401) {
                if (!this.password) {
                    // abort authentication if we don't have a password
                    return Promise.reject(new Error('Unauthorized'));
                }
                else if (req.auth) {
                    // the request contained an authentication response but still fails with error 401, which means
                    // we have the wrong password
                    return Promise.reject(new Error('Invalid password'));
                }
                try {
                    // extract the authentication challenge parameters
                    const authParams = JSON.parse(response.error.message);
                    // setup the authentication response based on the challenge
                    this.auth = this.createAuthResponse(authParams);
                }
                catch (e) {
                    // something went wrong
                    const error = new Error('Failed to setup authentication: ' + (e instanceof Error ? e.message : e));
                    if (e instanceof Error) {
                        error.stack = e.stack;
                    }
                }
                // now try the same request again
                return this.requestWithAuthentication(request, clientParams);
            }
            return Promise.reject(new Error(response.error.message));
        }
        // this request was successful
        return response;
    }
    /**
     * Creates an authentication response based on the given challenge and the configured password.
     * @param params - Authentication challenge params.
     */
    createAuthResponse(params) {
        if (params.auth_type !== 'digest') {
            throw new Error(`Unsupported authentication type "${params.auth_type}"`);
        }
        if (params.algorithm !== 'SHA-256') {
            throw new Error(`Unsupported hash algorithm "${params.algorithm}"`);
        }
        if (!this.password) {
            throw new Error('No password specified');
        }
        // create a function for generating SHA-256 hashes
        const hash = (...parts) => crypto_1.default.createHash('sha256').update(parts.join(':')).digest('hex');
        // generate a random number
        const cnonce = Math.round(Math.random() * 1000000);
        // construct the response
        const response = [
            hash('admin', params.realm, this.password),
            params.nonce,
            params.nc || 1,
            cnonce,
            'auth',
            hash('dummy_method', 'dummy_uri'),
        ];
        return {
            realm: params.realm,
            username: 'admin',
            nonce: params.nonce,
            cnonce,
            response: hash(...response),
            algorithm: 'SHA-256',
        };
    }
}
exports.JSONRPCClientWithAuthentication = JSONRPCClientWithAuthentication;
//# sourceMappingURL=auth.js.map