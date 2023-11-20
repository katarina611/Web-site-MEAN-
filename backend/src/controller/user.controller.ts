import * as express from 'express';
import User from '../models/user'
import ND from '../models/neradniDani'

export class UserController {
    getUsers = (req: express.Request, res: express.Response) => {
        let tip = req.body.tip;

        User.find({ 'tip': tip }, (err, user) => {
            if (err) console.log(err);
            else {
                res.json(user)
            }
        })
    }
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type

        User.findOne({ 'korIme': username, 'lozinka': password, 'tip': type }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    getAllUN = (req: express.Request, res: express.Response) => {


        User.find((err, user) => {
            if (err) console.log(err);
            else {
                let usernames = []
                for (let i of user) {
                    usernames.push(i.korIme)
                }
                res.json(usernames)
            }
        })
    }
    getAll = (req: express.Request, res: express.Response) => {

        User.find((err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'korIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    update = (req: express.Request, res: express.Response) => {
        let un = req.body.un;
        let menja = req.body.tip;
        let param = req.body.param;
        if (menja == "lozinka")
            User.collection.updateOne({ 'korIme': un }, { $set: { "lozinka": param } })
        else if (menja == "ime")
            User.collection.updateOne({ 'korIme': un }, { $set: { "ime": param } })
        else if (menja == "prezime")
            User.collection.updateOne({ 'korIme': un }, { $set: { "prezime": param } })
        else if (menja == "adresa")
            User.collection.updateOne({ 'korIme': un }, { $set: { "adresa": param } })
        else if (menja == "tel") {
            param = Number(param)
            User.collection.updateOne({ 'korIme': un }, { $set: { "tel": param } })

        }
        else if (menja == "mejl")
            User.collection.updateOne({ 'korIme': un }, { $set: { "mejl": param } })
        else if (menja == "slika")
            User.collection.updateOne({ 'korIme': un }, { $set: { "slika": param } })

        else if (menja == "brLicence") {
            param = Number(param)
            User.collection.updateOne({ 'korIme': un }, { $set: { "brLicence": param } })

        }
        else if (menja == "specijalizacija")
            User.collection.updateOne({ 'korIme': un }, { $set: { "specijalizacija": param } })

        else if (menja == "ogranak")
            User.collection.updateOne({ 'korIme': un }, { $set: { "ogranak": param } })
        else if (menja == "korIme")
            User.collection.updateOne({ 'korIme': un }, { $set: { "korIme": param } })


        res.json()
    }
    search = (req: express.Request, res: express.Response) => {
        let searchparam = req.body.param;
        User.find({ 'ogranak': { $regex: searchparam } }, (err, news) => {
            if (err) console.log(err)
            else res.json(news);
        })
    }

    inputDoc = (req: express.Request, res: express.Response) => {
        let u = new User(req.body);

        u.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else res.json();
        })
    }
    deleteUser = (req: express.Request, res: express.Response) => {
        let un = req.body.un;

        User.deleteOne({ 'korIme': un }, (err, resp) => {

            if (err) {
                console.log(err);
            }
            else res.json()



        })
    }
    prihvatiZahtev = (req: express.Request, res: express.Response) => {
        let u = new User(req.body);

        u.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else res.json();
        })
    }
    addND = (req: express.Request, res: express.Response) => {
        let nd = new ND(req.body);

        nd.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else res.json();
        })
    }

    getUNLekar = (req: express.Request, res: express.Response) => {
        let un = req.body.un;
        ND.find({ 'korIme': un }, (err, user) => {
            if (err) console.log(err);
            else {
                res.json(user)
            }
        })
    }
    
}