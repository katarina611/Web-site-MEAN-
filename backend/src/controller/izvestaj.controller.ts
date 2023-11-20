import * as express from 'express';
import Izv from '../models/izvestaji'


export class IzvController {
    izvUser= (req: express.Request, res: express.Response) => {
        let un=req.body.un;
        Izv.find({ 'pacijent': un}  ,(err,i) => {
            if (err) console.log(err);
            else res.json(i)
            
        })
    }
    izvUserDoSada= (req: express.Request, res: express.Response) => {
        let un=req.body.un;
        let now = new Date()
        Izv.find({}  ,(err,izv) => {
            if (err) console.log(err);
            else {
                let izvP=[]
                for(let i of izv)
                {
                    i.datum=new Date(i.datum)
                    if(i.datum<now)
                    {   
                        izvP.push(i)
                    }
                }
               res.json(izvP)

            }
            
        })
    }
    insertIzvestaj= (req: express.Request, res: express.Response) => {
        let i = new Izv( req.body);
        
        i.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else res.json();
        })
    }
}