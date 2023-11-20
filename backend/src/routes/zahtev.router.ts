import express from 'express';
import { ZahtevController } from '../controller/zahtev.controller';
const zahRouter = express.Router();

zahRouter.route('/input').post(
    (req, res) => new ZahtevController().input(req, res)
)
zahRouter.route('/getAllZah').get(
    (req, res) => new ZahtevController().getAllZah(req, res)
)
zahRouter.route('/getblockedEmails').get(
    (req, res) => new ZahtevController().getblockedEmails(req, res)
)
zahRouter.route('/odbijZahtev').post(
    (req, res) => new ZahtevController().odbijZahtev(req, res)
)
zahRouter.route('/obrisiZahtev').post(
    (req, res) => new ZahtevController().obrisiZahtev(req, res)
)

export default zahRouter;