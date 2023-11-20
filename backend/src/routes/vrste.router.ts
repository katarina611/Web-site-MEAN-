import express from 'express';
import { VrsteController } from '../controller/vrste.controller';
const vrsteRouter = express.Router();

vrsteRouter.route('/getAll').post(
    (req, res) => new VrsteController().getAll(req, res)
)
vrsteRouter.route('/getAllSpec').get(
    (req, res) => new VrsteController().getAllSpec(req, res)
)
vrsteRouter.route('/addVrsta').post(
    (req, res) => new VrsteController().addVrsta(req, res)
)
vrsteRouter.route('/getAllVrste').get(
    (req, res) => new VrsteController().getAllVrste(req, res)
)
vrsteRouter.route('/updateVrsta').post(
    (req, res) => new VrsteController().updateVrsta(req, res)
)
vrsteRouter.route('/updateVrstaEl').post(
    (req, res) => new VrsteController().updateVrstaEl(req, res)
)
vrsteRouter.route('/deleteVrsta').post(
    (req, res) => new VrsteController().deleteVrsta(req, res)
)
vrsteRouter.route('/newSpec').post(
    (req, res) => new VrsteController().newSpec(req, res)
)
export default vrsteRouter;