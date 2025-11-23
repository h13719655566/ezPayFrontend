import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, Alert, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, styled } from '@mui/material';
import axios from 'axios';
import type { WebhookDelivery } from '../types/Webhook';

const BASE_URL = 'http://localhost:8080';
const API_URL = `${BASE_URL}/webhooks/deliveries`;

// 輔助函數：根據 HTTP 狀態碼選擇顏色
const getStatusColor = (status: number): 'success' | 'warning' | 'error' | 'default' => {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 400 && status < 500) return 'warning';
    if (status >= 500) return 'error';
    return 'default';
};

const TruncatedText = styled(Typography)(({ theme }) => ({
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}));


const WebhookDeliveryMonitor: React.FC = () => {
    const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true); // 追蹤第一次載入
    const [error, setError] = useState<string | null>(null);

    // --- 數據獲取邏輯：元件內嵌 axios 呼叫 ---
    const fetchDeliveries = useCallback(() => {
        // 如果不是第一次載入，則只設置 isRefreshing
        if (!initialLoading) {
            setIsRefreshing(true);
        }
        setError(null);
        
        axios.get<WebhookDelivery[]>(API_URL)
            .then(response => {
                const sortedDeliveries = response.data.sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setDeliveries(sortedDeliveries);
            })
            .catch(err => {
                const errorMessage = err.response?.data?.message || err.message || 'Unknown network error occurred.';
                setError(`Error loading webhook deliveries: ${errorMessage}`);
            })
            .finally(() => {
                // 不論成功或失敗，結束載入狀態
                setIsRefreshing(false);
                setInitialLoading(false);
            });
    }, [initialLoading]); // 將 initialLoading 加入依賴

    useEffect(() => {
        fetchDeliveries();
        // 10 秒自動刷新
        const intervalId = setInterval(fetchDeliveries, 10000); 
        return () => clearInterval(intervalId);
    }, [fetchDeliveries]);

    // --- 渲染部分 ---
    return (
        <Paper elevation={3} sx={{ p: 4, margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Webhook Delivery Monitor
                </Typography>
                {/* 即使在載入中，按鈕也保留在原位 */}
                <Button variant="outlined" onClick={fetchDeliveries} disabled={isRefreshing} startIcon={isRefreshing ? <CircularProgress size={18} color="inherit" /> : null}>
                    {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
            </Box>

            {/* 表格容器：這裡將包含所有條件渲染 */}
            <Box sx={{ minHeight: 150, position: 'relative' }}> 
                
                {/* 1. 錯誤訊息 */}
                {error && <Alert severity="error">{error}</Alert>}

                {/* 2. 第一次載入中 */}
                {initialLoading && !error && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                        <CircularProgress size={40} />
                    </Box>
                )}

                {/* 3. 數據內容或空狀態 */}
                {!initialLoading && !error && (
                    <>
                        {deliveries.length === 0 ? (
                            <Alert severity="info" sx={{ my: 3 }}>No webhook deliveries recorded yet.</Alert>
                        ) : (
                            <TableContainer component={Paper} variant="outlined">
                                {/* 表格內容保持不變 */}
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Payment ID</TableCell>
                                            <TableCell>Endpoint ID</TableCell>
                                            <TableCell align="center">Attempt</TableCell>
                                            <TableCell align="center">Status Code</TableCell>
                                            <TableCell>Next Retry</TableCell>
                                            <TableCell>Response Excerpt</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {deliveries.map((d) => (
                                            <TableRow key={d.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{new Date(d.createdAt).toLocaleTimeString()}</TableCell>
                                                <TableCell>{d.paymentId}</TableCell>
                                                <TableCell>{d.endpointId}</TableCell>
                                                <TableCell align="center">{d.attempt}</TableCell>
                                                <TableCell align="center">
                                                    <Chip 
                                                        label={d.statusCode} 
                                                        color={getStatusColor(d.statusCode)} 
                                                        size="small" 
                                                        sx={{ fontWeight: 'bold' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {d.nextRetryAt ? new Date(d.nextRetryAt).toLocaleTimeString() : 'N/A (Final)'}
                                                </TableCell>
                                                <TableCell>
                                                    <TruncatedText variant="body2">
                                                        {d.responseBody || '—'}
                                                    </TruncatedText>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default WebhookDeliveryMonitor;