
export interface RegisterWebhookRequest {
    /** The URL your server will receive webhook POST requests on. */
    url: string;
}

export interface RegisterWebhookResponse {
    /** Internal ID for this webhook endpoint. */
    id: number; 

    /** The URL that will receive webhook POST requests. */
    url: string;

    /** A Base64-encoded secret used to verify HMAC signatures on webhook events. */
    secret: string; 
}