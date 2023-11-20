import express, { Router } from 'express';
import cors from 'cors'
import userRouter from './routes/user.router';
import mongoose from 'mongoose';
import zahRouter from './routes/zahtev.router';
import vrsteRouter from './routes/vrste.router';
import pregRouter from './routes/pregled.router';
import izvRouter from './routes/izvestaj.router';
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/klinika")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router =  Router()

router.use('/user', userRouter)
router.use('/zahtevi', zahRouter)
router.use('/vrste', vrsteRouter)
router.use('/pregledi', pregRouter)
router.use('/pregledi', pregRouter)
router.use('/izvestaji', izvRouter)
app.use('/', router)
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));