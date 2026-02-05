import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import messageRoutes from './routes/message.routes.js'; // Note the .js extension!

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📂 Project Root: ${path.join(__dirname, '../')}`);
});