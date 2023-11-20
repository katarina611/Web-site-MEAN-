import * as express from 'express';
import Preg from '../models/pregled'
import { Timestamp } from 'mongodb';
import Vrste from '../models/vrste'
import Promo from '../models/promocija'

export class PregController {
    insertPregled = (req: express.Request, res: express.Response) => {
        let p = new Preg(req.body);
        let doc = req.body.lekar;
        let datePoc = new Date(req.body.pocetak);
        let dateKraj = new Date(req.body.kraj);

        Preg.find({ "lekar": doc }, (err, preg) => {
            if (err) console.log(err);
            else {
                preg.sort((a, b) => {
                    if (a.pocetak > b.pocetak)
                        return 1;
                    else if (a.pocetak < b.pocetak)
                        return -1;

                    else return 0
                })
                let a = new Date('2020-01-01')
                let b = new Date('1925-01-01')
                console.log("b");
                for (let i of preg) {
                    i.pocetak = new Date(i.pocetak)
                    i.kraj = new Date(i.kraj)

                    if (i.pocetak == datePoc || (datePoc <= i.kraj && datePoc >= i.pocetak) || (dateKraj <= i.kraj && dateKraj >= i.pocetak)) {

                        res.json({ "poruka": "Lekar je zauzet u tom terminu!" })
                        return;
                    }
                }
                p.save((err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({ "poruka": "Uspesno ste zakazali pregled" })


                    };
                })




            }
        }

        )

    }
    pregUser = (req: express.Request, res: express.Response) => {
        let un = req.body.un;
        Preg.find({ $and:[{ 'pacijent': un },{'otkazan':false}]}, (err, i) => {
            if (err) console.log(err);
            else res.json(i)

        })
    }
    pregUserOtkz = (req: express.Request, res: express.Response) => {
        let un = req.body.un;
        Preg.find({ $and:[{ 'pacijent': un },{'otkazan':true}]}, (err, i) => {
            if (err) console.log(err);
            else res.json(i)

        })
    }
    pregDoc = (req: express.Request, res: express.Response) => {
        let un = req.body.un;
        
       
        Preg.find({ $and:[{ 'lekar': un },{'otkazan':false}]}, (err, i) => {
            if (err) console.log(err);
            else res.json(i)

        })
    }
    pregDocVrst = (req: express.Request, res: express.Response) => {
        let un = req.body.un;
        let vs=req.body.vs;
        Preg.find({ $and:[{ 'lekar': un },{'otkazan':false},{'vrsta':vs}]}, (err, i) => {
            if (err) console.log(err);
            else res.json(i)

        })
    }
    deletePreg=(req:express.Request, res:express.Response)=>{
        let un = req.body.un;
        let date= req.body.date;
       let lekar= req.body.lekar;
       console.log(date+un+lekar)
        Preg.deleteOne({ $and: [{ 'pacijent': un}, { 'pocetak': date}, { 'lekar': lekar}] } , (err,resp)=>{
            
            if(err) {
                console.log(err);
            }
            else {
                
                res.json()
            }
    
    
    
        })
        }
        updatePreg=(req:express.Request, res:express.Response)=>{
           
            Preg.collection.updateOne({ $and: [{ 'vrsta': req.body.vrsta },{ 'vreme': req.body.vreme },{ 'lekar': req.body.lekar }]}, { $set: { 'otkazan':true }})
            Preg.collection.updateOne({ $and: [{ 'vrsta': req.body.vrsta },{ 'vreme': req.body.vreme },{ 'lekar': req.body.lekar }]}, { $set: {'razlog':req.body.razlog}},(err,resp)=>{
                  
            if(err) {
                console.log(err);
            }
            else {
                
                res.json()
            }
            })
        
        }
        addPromo=(req:express.Request, res:express.Response)=>{
            let promo=new Promo(req.body)
            promo.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json()
                };
            })

        }
        getPromos=(req:express.Request, res:express.Response)=>{

            Promo.find((err,p)=>{
                if(err) {
                    console.log(err);
                }
                else {
                    res.json(p)
                }
            })

        }


}