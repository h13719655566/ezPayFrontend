import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Alert } from '@mui/material';
import type { RegisterWebhookRequest, RegisterWebhookResponse } from '../types/Webhook.ts';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const RegisterWebhookForm: React.FC = () => {
    const [url, setUrl] = useState('');
    
    const [result, setResult] = useState<RegisterWebhookResponse | null>(null);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        
        if (!url) {
            setError("URL cannot be empty.");
            return;
        }

        const requestBody: RegisterWebhookRequest = { url };

        try {
            const response = await axios.post<RegisterWebhookResponse>(
                `${BASE_URL}/webhooks/register`,
                requestBody
            );

            setResult(response.data);

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred.';
            setError(`Registration failed: ${errorMessage}`);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                 Register Webhook Endpoint
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Client provides a URL. Server generates a secret and stores the endpoint.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Merchant Webhook URL"
                    fullWidth
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="e.g., https://yourserver.com/ezpay/webhook"
                    sx={{ mb: 2 }}
                />
                
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register Endpoint
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                </Alert>
            )}

            {result && (
                <Box sx={{ mt: 4, p: 2, border: '1px dashed #4caf50', borderRadius: 1 }}>
                    <Alert severity="success">
                        Webhook Registration Successful! Please save your Secret Key.                    </Alert>
                    <Typography sx={{ mt: 2, wordBreak: 'break-all' }}>
                        **Endpoint ID:** {result.id}
                        <br />
                            **Secret (HMAC Key):** <Box component="span" sx={{ fontWeight: 'bold', color: 'red' }}>
                            {result.secret}
                        </Box>
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};