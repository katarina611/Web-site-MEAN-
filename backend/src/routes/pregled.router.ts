import express from 'express';
import { PregController } from '../controller/pregled.controller';
const pregRouter = express.Router();
pregRouter.route('/insertPregled').post(
    (req, res) => new PregController().insertPregled(req, res)
)
pregRouter.route('/pregUser').post(
    (req, res) => new PregController().pregUser(req, res)
)
pregRouter.route('/pregUserOtkz').post(
    (req, res) => new PregController().pregUserOtkz(req, res)
)
pregRouter.route('/pregDoc').post(
    (req, res) => new PregController().pregDoc(req, res)
)
pregRouter.route('/pregDocVrst').post(
    (req, res) => new PregController().pregDocVrst(req, res)
)
pregRouter.route('/deletePreg').post(
    (req, res) => new PregController().deletePreg(req, res)
)
pregRouter.route('/updatePreg').post(
    (req, res) => new PregController().updatePreg(req, res)
)
pregRouter.route('/addPromo').post(
    (req, res) => new PregController().addPromo(req, res)
)
pregRouter.route('/getPromos').get(
    (req, res) => new PregController().getPromos(req, res)
)
export default pregRouter;