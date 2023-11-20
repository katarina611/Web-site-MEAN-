import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Vrste } from '../models/vrstep';
import { UserService } from '../service/user.service';
import { PreglediService } from '../service/pregledi.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ND } from '../models/neradniDani';


@Component({
  selector: 'app-stranica-lekara',
  templateUrl: './stranica-lekara.component.html',
  styleUrls: ['./stranica-lekara.component.css']
})
export class StranicaLekaraComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private preglediService: PreglediService, private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(120).subscribe((res) => {
      if (res) {
        localStorage.clear()
        this.router.navigate([''])
      }
    })
    let a = localStorage.getItem("tip")
    if (a != 'stranicaLekara') {
      this.router.navigate([''])
    }
    localStorage.setItem("tip", 'pacijent')
  }
  u: string;
  d: string
  user: User;
  doc: User;
  vs: Vrste[];
  zNaziv: string;
  zVreme: string;
  zPoc: Date;
  zKraj: Date;
  showZakazivanje: boolean;

  ndLekara: ND[]
  ngOnInit(): void {
    this.showZakazivanje = false;
    this.u = localStorage.getItem("ulogovan");
    this.d = localStorage.getItem("doktor");
    this.userService.getUser(this.d).subscribe((d: User) => {
      this.doc = d;
      this.preglediService.getAllVrsteSpec(this.doc.specijalizacija).subscribe((v: Vrste[]) => {
        this.vs = v;
      })
      this.userService.getUNLekar(d.korIme).subscribe((nd: ND[]) => {
        this.ndLekara = nd;


      })
    })
  }
  addPreg() {
    this.showZakazivanje = !this.showZakazivanje

  }
  insertP() {
    this.zPoc = new Date(this.zPoc)
    let nw = new Date();
    if (nw > this.zPoc) {
      alert("Ne mozete zakazati pregled u proslosti! ")
      return
    }
    let min = Number(this.zVreme.substring(3, 5))
    let h = Number(this.zVreme.substring(0, 2))
    if (!(0 <= min && min < 60 && h < 24 && h > 0)) {
      alert("Pogresno uneto vreme, ono mora biti u formatu hh::mm")
      return;
    }

    this.zPoc.setHours(h, min)
    let trajanje = this.preglediService.trajanje(this.zNaziv, this.vs)
    min = min + trajanje;
    if (min > 60) {
      min = min % 60
      h = h + 1
    }
    for (let i of this.ndLekara) {
      i.do = new Date(i.do)
      i.od = new Date(i.od)
      if (this.zPoc > i.od && this.zPoc < i.do) {
        alert("Lekar ne radi u tom vremenskom periodu")
        return;
      }
    }

    this.zKraj = new Date(this.zPoc)
    this.zKraj.setHours(h, min)
    this.preglediService.insertPregled(this.zNaziv, this.zPoc, this.zKraj, this.zVreme, this.d, this.u).subscribe((resp) => {
      alert(resp['poruka']);
      this.zNaziv=null
      this.zVreme=null
      this.zPoc=null
      this.zKraj=null
      this.showZakazivanje = !this.showZakazivanje
    })
  }

}
