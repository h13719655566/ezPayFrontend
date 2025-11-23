import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Alert, Grid } from '@mui/material';
import type { PaymentRequest, PaymentResponse } from '../types/Payment.ts';
import axios from 'axios';

// API Base URL
const BASE_URL = 'http://localhost:8080';

// Initial form state (uses PaymentRequest interface)
const initialFormState: PaymentRequest = {
    firstName: '',
    lastName: '',
    zipCode: '',
    cardNumber: '',
    amount: 1000, // Default 10.00 AUD (in cents)
    currency: 'AUD',
};


export const PaymentForm: React.FC = () => {
    const [form, setForm] = useState<PaymentRequest>(initialFormState);
    const [result, setResult] = useState<PaymentResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Generic handler for all input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            // Convert 'amount' field value to a number
            [name]: name === 'amount' ? Number(value) : value
        }));
    };

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        // Basic validation
        if (!form.cardNumber || !form.firstName || form.amount <= 0) {
            setError("Please ensure all fields are completed and the amount is greater than 0.");
            return;
        }

        try {
            const response = await axios.post<PaymentResponse>(
                `${BASE_URL}/api/payments`,
                form // Use form state directly as Request Body
            );

            setResult(response.data);

        } catch (err: any) {
            // Handle API errors (e.g., 400 validation failures)
            const errorDetail = err.response?.data?.message || err.message || 'An unknown error occurred.';
            setError(`Payment Failed: ${errorDetail}`);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                💳 Process Payment
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Encrypted card data is stored securely. A webhook event is triggered upon success.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    {/* Payer Information */}
                    <Grid item xs={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            fullWidth
                            required
                            value={form.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            required
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* Card Number and Zip Code */}
                    <Grid item xs={12}>
                        <TextField
                            label="Credit Card Number (Plain Text)"
                            name="cardNumber"
                            fullWidth
                            required
                            value={form.cardNumber}
                            onChange={handleChange}
                            inputProps={{ maxLength: 16 }}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Zip Code"
                            name="zipCode"
                            fullWidth
                            required
                            value={form.zipCode}
                            onChange={handleChange}
                        />
                    </Grid>
                    
                    {/* Amount and Currency */}
                    <Grid item xs={8}>
                        <TextField
                            label="Amount (in cents)"
                            name="amount"
                            fullWidth
                            required
                            type="number"
                            value={form.amount}
                            onChange={handleChange}
                            inputProps={{ min: 1 }}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Currency (ISO 4217)"
                            name="currency"
                            fullWidth
                            required
                            value={form.currency}
                            onChange={handleChange}
                            inputProps={{ maxLength: 3 }}
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" color="secondary" fullWidth>
                            Process Payment (AES Encrypted)
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Success Result Display */}
            {result && (
                <Box sx={{ mt: 4, p: 2, border: '1px dashed #2196f3', borderRadius: 1 }}>
                    <Alert severity="success">
                        Payment Created Successfully! Webhook Event Published.
                    </Alert>
                    <Typography sx={{ mt: 2 }}>
                        **Payment ID:** {result.paymentId}
                        <br />
                        **Status:** {result.status}
                        <br />
                        **Last 4 Digits:** {result.last4}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};