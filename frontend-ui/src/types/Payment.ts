// frontend-ui/src/types/Payment.ts

export interface PaymentRequest {
    firstName: string;
    lastName: string;
    zipCode: string;
    
    cardNumber: string; 

    /** Payment amount in cents (e.g. 1000 = 10.00 AUD) */
    amount: number; 

    /** Currency code (ISO 4217), e.g., AUD, USD */
    currency: string;
}

export interface PaymentResponse {
    paymentId: string;
    status: string; // Should be 'created' on success
    last4: string;  // Last 4 digits of the card
}