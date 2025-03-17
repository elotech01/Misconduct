const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const secret = 'whsec_q2qkAy3rVChAt3KgvBDIrwxBouSOX7SYh4ulwzUmEePQ';

app.use(express.json());

app.post('/api/verification.php', (req, res) => {
    const signature = req.headers['x-webhook-signature']; // Signature from webhook headers
    const payload = JSON.stringify(req.body);

    // Generate expected signature using the secret
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    if (signature !== expectedSignature) {
        return res.status(401).send('Invalid signature');
    }

    console.log('Received webhook:', req.body);
    res.status(200).send('Webhook received');
});

app.listen(PORT, () => console.log(`Webhook endpoint running on http://localhost:${PORT}`));
