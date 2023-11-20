import express from 'express';
import { IzvController } from '../controller/izvestaj.controller';
const izvRouter = express.Router();
izvRouter.route('/izvUser').post(
    (req, res) => new IzvController().izvUser(req, res)
)
izvRouter.route('/izvUserDoSada').post(
    (req, res) => new IzvController().izvUserDoSada(req, res)
)
izvRouter.route('/insertIzvestaj').post(
    (req, res) => new IzvController().insertIzvestaj(req, res)
)
export default izvRouter;