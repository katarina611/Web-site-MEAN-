import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/user";
  uri1 = "http://localhost:4000/zahtevi";

  getUsers(tip: string) {
    let data = {
      tip: tip
    }
    return this.http.post(`${this.uri}/getUsers`, data)
  }
  addND(data){
    return this.http.post(`${this.uri}/addND`, data)
  }
  getUNLekar(un)
  {
    let data = {
      un: un
    }
    return this.http.post(`${this.uri}/getUNLekar`, data)
  }
  getUser(username: string) {
    let data = {
      username: username
    }
    return this.http.post(`${this.uri}/getUser`, data)
  }
  getAllZah() {
    
    return this.http.get(`${this.uri1}/getAllZah`)
  }
  getblockedEmails(){
    return this.http.get(`${this.uri1}/getblockedEmails`)
  }
  deleteUser(un){
    let data = {
      un: un
    }
    return this.http.post(`${this.uri}/deleteUser`, data)
  }
  login(username: string, password: string, tip: string) {
    let data = {
      username: username, password: password, type: tip
    }
    return this.http.post(`${this.uri}/login`, data)
  }
  getAllUN() {
    return this.http.get(`${this.uri}/getAllUN`)
  }
  getAll() {
    return this.http.get(`${this.uri}/getAll`)
  }
  inputDoc(data) {
    const d = data
    return this.http.post(`${this.uri}/inputDoc`, d)

  }
  input(data) {
    const d = data
    return this.http.post(`${this.uri1}/input`, d)

  }
  update(un, tip, par) {
    const data = {
      un: un,
      tip: tip,
      param: par
    }
    return this.http.post(`${this.uri}/update`, data)
  }
  odbijZahtev(un){
    const data = {
      un: un
    }
    return this.http.post(`${this.uri1}/odbijZahtev`, data)

  }
  obrisiZahtev(data) {
    const d = data
    return this.http.post(`${this.uri1}/obrisiZahtev`, d)

  }
  prihvatiZahtev(data) {
    const d = data
    return this.http.post(`${this.uri}/prihvatiZahtev`, d)

  }
  sortA(users, tip) {

    if (tip == 0) {
      users.sort((a, b) => {
        return a.ime.localeCompare(b.ime)
      })
    }
    else if (tip == 1) {
      users.sort((a, b) => {
        return a.prezime.localeCompare(b.prezime)
      })
    }
    else if (tip == 2) {
      users.sort((a, b) => {
        return a.specijalizacija.localeCompare(b.specijalizacija)
      })
    }
    else {
      users.sort((a, b) => {
        return a.ogranak.localeCompare(b.ogranak)
      })
    }

    return users;


  }
  sortZ(users, tip) {
    if (tip == 0) {
      users.sort((b, a) => {
        return a.ime.localeCompare(b.ime)
      })
    }
    else if (tip == 1) {
      users.sort((b, a) => {
        return a.prezime.localeCompare(b.prezime)
      })
    }
    else if (tip == 2) {
      users.sort((b, a) => {
        return a.specijalizacija.localeCompare(b.specijalizacija)
      })
    }
    else {
      users.sort((b, a) => {
        return a.ogranak.localeCompare(b.ogranak)
      })
    }

    return users;


  }
  sortPreg(preg) {
    preg.sort((p1, p2) => {
      if (p1.pocetak > p2.pocetak)
        return 1
      else if (p1.pocetak < p2.pocetak) return -1
      else return 0
    })
    return preg;
  }
  sortIzv(izv) {
    izv.sort((p2, p1) => {
      if (p1.pocetak > p2.pocetak)
        return 1
      else if (p1.pocetak < p2.pocetak) return -1
      else return 0
    })
    return izv
  }
  search(param) {
    const data = {
      param: param
    }
    return this.http.post(`${this.uri}/search`, data)

  }

}
