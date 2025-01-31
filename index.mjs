import express from 'express';
import cors from 'cors';
import mongoDB from './config/mongoDB.mjs';
import shortnerRouter from './routes/shortner.mjs';
import qrRouter from './routes/qr.mjs';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to byteJS API' });
});

app.use('/shortner', shortnerRouter);
app.use('/qr', qrRouter);

app.listen(process.env.PORT, () => {
    mongoDB.connect();
});
