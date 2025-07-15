import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import { requestLogger } from './middleware/logger.js';
import avgRoutes from './routes/average.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api', avgRoutes);

app.use('*', (_, res) => res.status(404).json({ error: 'route not found' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
