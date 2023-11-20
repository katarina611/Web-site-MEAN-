import * as express from 'express';
import Zah from '../models/zahtev'
import { Console } from 'console';

export class ZahtevController {
    input= (req: express.Request, res: express.Response) => {
        let z= new Zah(req.body);
        
        z.save((err,resp)=>
        {
            if(err) {
                console.log(err);
            }
            else res.json();
        })
    }
    getAllZah= (req: express.Request, res: express.Response) => {
       
        Zah.find({'odbijen':false},(err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    getblockedEmails= (req: express.Request, res: express.Response) => {
      
        Zah.find({'odbijen':true},(err, user) => {

            if (err) console.log(err);
            else {
                let email=[]
                for (let i of user)
                {
                    email.push(i.mejl)
                }
                res.json(email)
            }
        })
    }
    odbijZahtev= (req: express.Request, res: express.Response) => {
        let un=req.body.un;
        Zah.collection.updateOne({ 'korIme': un }, { $set: { "odbijen": true } },(err,resp)=>{
            if (err) console.log(err);
            else res.json()
        })
    }
    obrisiZahtev= (req: express.Request, res: express.Response) => {
        let un=req.body.korIme;
        
        Zah.deleteOne({'korIme':un},(err, user) => {

            if (err) console.log(err);
            else  res.json()
    })
}
}