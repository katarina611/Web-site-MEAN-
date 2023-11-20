import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preg } from '../models/pregledi';

@Injectable({
  providedIn: 'root'
})
export class PreglediService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/pregledi";
  uri1 = "http://localhost:4000/vrste";
  uri2 = "http://localhost:4000/izvestaji";
  addPromo(data){
    return this.http.post(`${this.uri}/addPromo`, data)
  }
  getPromos(){
    return this.http.get(`${this.uri}/getPromos`)
  }
  getAllSpec() {
    return this.http.get(`${this.uri1}/getAllSpec`)
  }
  addVrsta(data) {
    return this.http.post(`${this.uri1}/addVrsta`, data)
  }
  updateVrstaEl(naz,param,tip){
    const data = {
      naziv: naz,
      param:param,
      tip:tip
    }

    return this.http.post(`${this.uri1}/updateVrstaEl`, data)
  }
  getAllVrsteSpec(spec) {
    const data = {
      spec: spec
    }

    return this.http.post(`${this.uri1}/getAll`, data)
  }
  getAllVrste() {
    return this.http.get(`${this.uri1}/getAllVrste`)
  }
  updateVrsta(naz) {
    const data = {
      naziv: naz
    }

    return this.http.post(`${this.uri1}/updateVrsta`, data)
  }
  deleteVrsta(naz) {
    const data = {
      naziv: naz
    }

    return this.http.post(`${this.uri1}/deleteVrsta`, data)
  }
  insertPregled(naz, date, kraj, vreme, lekar, pacijent) {
    const data = {
      vrsta: naz,
      pocetak: date,
      kraj: kraj,
      vreme: vreme,
      lekar: lekar,
      pacijent: pacijent,
      otkazan: false,
      razlog: ""
    }

    return this.http.post(`${this.uri}/insertPregled`, data)

  }
  newSpec(naziv) {
    const data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri1}/newSpec`, data)
  }
  insertIzvestaj(data) {
    return this.http.post(`${this.uri2}/insertIzvestaj`, data)
  }
  trajanje(naziv, vs) {
    for (let i of vs) {
      if (i.naziv == naziv) {
        return i.trajanje
      }
    }
  }
  izvUser(un) {
    const data = {
      un: un,
    }
    return this.http.post(`${this.uri2}/izvUser`, data)
  }
  izvUserDoSada(un) {
    const data = {
      un: un
    }
    return this.http.post(`${this.uri2}/izvUserDoSada`, data)
  }
  pregUser(un) {
    const data = {
      un: un
    }
    return this.http.post(`${this.uri}/pregUser`, data)
  }
  pregUserOtkz(un)
  {
    
    const data = {
      un: un
    }
    return this.http.post(`${this.uri}/pregUserOtkz`, data)
  }
  pregDoc(un, vs) {
    if (vs == '') {
      const data = {
        un: un
      }
      return this.http.post(`${this.uri}/pregDoc`, data)
    }
    else {
      const data = {
        un: un,
        vs: vs
      }
      return this.http.post(`${this.uri}/pregDocVrst`, data)
    }

  }
  updatePregled(preg, obz) {
    const data = {
      vrsta: preg.vrsta,
      pocetak: preg.pocetak,
      kraj: preg.kraj,
      vreme: preg.vreme,
      lekar: preg.lekar,
      pacijent: preg.pacijent,
      otkazan: true,
      razlog: obz
    }
    return this.http.post(`${this.uri}/updatePreg`, data)

  }

  deletePreg(un, date, lekar) {
    const data = {
      un: un,
      date: date,
      lekar: lekar
    }
    return this.http.post(`${this.uri}/deletePreg`, data)
  }
  sort3(preg) {
    preg.sort((p1, p2) => {
      if (p1.pocetak > p2.pocetak)
        return 1
      else if (p1.pocetak < p2.pocetak) return -1
      else return 0
    })
    let br = 0
    let preg3: Preg[] = []
    let now = new Date()

    for (let i of preg) {
      if (i.pocetak > now) {
        preg3.push(i)
        br = br + 1
      }
      if (br == 3) {
        break;
      }
    }

    return preg3;
  }
}
