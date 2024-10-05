import { JSONRPCClient, JSONRPCRequest, JSONRPCResponse, SendRequest } from 'json-rpc-2.0';
/**
 * Authentication challenge parameters sent by the server when a protected resource is requested.
 */
export interface RpcAuthChallenge {
    auth_type: string;
    nonce: number;
    nc?: number;
    realm: string;
    algorithm: string;
}
/**
 * Authentication response parameters supplied with each authenticated request.
 */
export interface RpcAuthResponse {
    realm: string;
    username: string;
    nonce: number;
    cnonce: number;
    response: string;
    algorithm: 'SHA-256';
}
/**
 * A request with authentication response parameters.
 */
export interface JSONRPCRequestWithAuth extends JSONRPCRequest {
    auth?: RpcAuthResponse;
}
/**
 * Extends JSONRPCClient to seamlessly handle authentication.
 */
export declare class JSONRPCClientWithAuthentication<ClientParams = void> extends JSONRPCClient<ClientParams> {
    protected password?: string | undefined;
    /**
     * Holds the current request ID. This number is incremented for each new request.
     */
    protected requestId: number;
    /**
     * Authentication response parameters sent with each request if the connection has been authenticated.
     */
    protected auth?: RpcAuthResponse;
    /**
     * @param password - The password to authenticate with.
     */
    constructor(send: SendRequest<ClientParams>, password?: string | undefined);
    requestAdvanced(request: JSONRPCRequest, clientParams?: ClientParams): PromiseLike<JSONRPCResponse>;
    requestAdvanced(requests: JSONRPCRequest[], clientParams?: ClientParams): PromiseLike<JSONRPCResponse[]>;
    /**
     * Handles 401 errors by parsing the authentication challenge, generating an authentication response
     * and supplying that response with each subsequent request.
     */
    protected requestWithAuthentication(request: JSONRPCRequest, clientParams?: ClientParams): Promise<JSONRPCResponse>;
    /**
     * Creates an authentication response based on the given challenge and the configured password.
     * @param params - Authentication challenge params.
     */
    protected createAuthResponse(params: RpcAuthChallenge): RpcAuthResponse;
}
//# sourceMappingURL=auth.d.ts.map