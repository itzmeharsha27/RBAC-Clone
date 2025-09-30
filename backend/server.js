import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import DbCon from './Utils/db.js';
import AuthRoutes from './Routes/Auth.js';
import AuthAdmin from './Routes/AdminRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

DbCon();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'rbac-steel.vercel.app'
}));
app.use(cookieparser());

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AuthAdmin);

app.get('/', (req, res) => {
  res.send('test');
});

// Exporting the express app to Vercel
export default app;
