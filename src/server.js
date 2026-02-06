import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import messageRoutes from './routes/message.routes.js';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Production middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.vercel.app', 'https://your-domain.railway.app']
        : '*'
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers for production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/messages', messageRoutes);

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        available_endpoints: [
            'GET /',
            'POST /api/messages',
            'POST /api/messages/test-ramesh',
            'POST /api/messages/test-savitri',
            'POST /api/messages/quick-conversation',
            'GET /api/messages/health'
        ]
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Honeycomb Scam Detection Server running on port ${PORT}`);
    console.log(`📂 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Access: http://localhost:${PORT}`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log('🔒 Production mode: Security headers enabled');
    }
});