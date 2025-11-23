import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { RegisterWebhookForm } from './components/RegisterWebhookForm';
import { PaymentForm } from './components/PaymentForm';
import WebhookDeliveryMonitor from './components/WebhookDeliveryMonitor';

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'primary.dark' }}>
         ezPay Payment System Demo 
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Backend Service Running on <Box component="span" sx={{ fontWeight: 'bold' }}>http://localhost:8080</Box>
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Webhook Registration Section */}
      <Box id="webhook-section" sx={{ my: 4, pt: 2 }}> {/* Added padding-top to prevent anchor jump from hiding content */}
        <RegisterWebhookForm />
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Payment Creation Section */}
      <Box id="payment-section" sx={{ my: 4, pt: 2 }}> {/* Added padding-top */}
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: 'text.primary' }}>
           Create Payment
        </Typography>
        <PaymentForm /> 
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Webhook Monitoring Section */}
      <Box id="monitor-section" sx={{ my: 4, pt: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: 'text.primary' }}>
            Webhook Delivery Tracker
        </Typography>
        <WebhookDeliveryMonitor /> 
      </Box>
      
    </Container>
  );
}

export default App;