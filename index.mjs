import express from 'express';
import cors from 'cors';
import mongoDB from './config/mongoDB.mjs';
import shortnerRouter from './routes/shortner.mjs';
import qrRouter from './routes/qr.mjs';

const app = express();

app.disable('x-powered-by');

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://bytejs.tech', 'https://re.bytejs.tech'] 
  : ['http://localhost:8000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to byteJS API' });
});

app.use('/shortner', shortnerRouter);
app.use('/qr', qrRouter);

mongoDB.connect().then(() => {
    app.listen(process.env.PORT);
}).catch(err => {
});
