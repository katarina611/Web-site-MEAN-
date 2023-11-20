import * as express from 'express';
import Vrste from '../models/vrste'
import Spec from '../models/specijalizacije'

export class VrsteController {
    getAll = (req: express.Request, res: express.Response) => {
        let spec = req.body.spec;

        Vrste.find({ $and: [{ 'odobren': true }, { 'specijalizacija': spec }] }, (err, vr) => {
            if (err) console.log(err);
            else
                res.json(vr)
        })
    }
    getAllSpec = (req: express.Request, res: express.Response) => {


        Spec.find((err, vr) => {
            if (err) console.log(err);
            else
                res.json(vr)
        })
    }
    addVrsta = (req: express.Request, res: express.Response) => {
        let v = new Vrste( req.body);
        v.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else res.json();
        })
    }
    getAllVrste= (req: express.Request, res: express.Response) => {
     
        Vrste.find({ 'odobren': false  }, (err, vr) => {
            if (err) console.log(err);
            else
                res.json(vr)
        })
    }
    updateVrsta= (req: express.Request, res: express.Response) => {
        let naziv=req.body.naziv;
     
        Vrste.collection.updateOne({ 'naziv': naziv}, { $set: { "odobren": true } },(err,resp)=>{
            
            if (err) {
                console.log(err);
            }
            else res.json()
        })

    }
    updateVrstaEl= (req: express.Request, res: express.Response) => {
        let naziv=req.body.naziv;
        let tip=req.body.tip
        let param=req.body.param
        if(tip=='naziv')
        {
            Vrste.collection.updateOne({ 'naziv': naziv}, { $set: { "naziv": param } },(err,resp)=>{
            
                if (err) {
                    console.log(err);
                }
                else res.json()
            })
        }
        else if(tip=='specijalizacija')
        {
            Vrste.collection.updateOne({ 'naziv': naziv}, { $set: { "specijalizacija": param } },(err,resp)=>{
            
                if (err) {
                    console.log(err);
                }
                else res.json()
            })
        }
        else if(tip=='trajanje')
        {
            Vrste.collection.updateOne({ 'naziv': naziv}, { $set: { "trajanje": param } },(err,resp)=>{
                param=Number(param)
                if (err) {
                    console.log(err);
                }
                else res.json()
            })
        }
        else if(tip=='cena'){
            param=Number(param)
            Vrste.collection.updateOne({ 'naziv': naziv}, { $set: { "cena": param } },(err,resp)=>{
            
                if (err) {
                    console.log(err);
                }
                else res.json()
            })
        }

    }
    deleteVrsta= (req: express.Request, res: express.Response) => {
        let naziv=req.body.naziv;
        
        Vrste.deleteOne({ 'naziv':naziv }, (err, resp) => {

            if (err) {
                console.log(err);
            }
            else res.json()



        })
    }
    newSpec =(req: express.Request, res: express.Response) => {
        let spec=new Spec(req.body)

        spec.save((err, resp) => {
            if (err) {
                console.log(err);
            }
            else res.json();
        })
    }
}