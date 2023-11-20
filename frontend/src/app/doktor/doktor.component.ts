import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { PreglediService } from '../service/pregledi.service';
import { User } from '../models/user';
import { Vrste } from '../models/vrstep';
import { Preg } from '../models/pregledi';
import { Spec } from '../models/specijalizacija';
import { Izv } from '../models/izvestaj';
import { BnNgIdleService } from 'bn-ng-idle';
import { parseArgs } from 'util';

@Component({
  selector: 'app-doktor',
  templateUrl: './doktor.component.html',
  styleUrls: ['./doktor.component.css']
})
export class DoktorComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private pregService: PreglediService, private bnIdle: BnNgIdleService) { 
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {
        localStorage.clear()
        this.router.navigate([''])
      }
     
    })
    let a=localStorage.getItem("tip")
    if(a!='doktor')
    {
      this.router.navigate([''])
    }
  }
  page: number = 0;
  param = [];
  show1: boolean;//otkazivanje pregleda
  show: boolean;//update doktora
  show2: boolean //ispis izvestaja
  show3: boolean; //dodavanje izvestaja

  reg: User;
  allusers: User[]

  vs: Vrste[]
  vrsta: string = ''
  obrazlozenje: string
  preg: Preg[]
  zaOtkz: Preg;
  izv: Izv[];
  userImage: string = "/assets/user.png";
  userImageFile: File
  spec: Spec[];
  nVrsta: string;
  nSpec: string;
  nTr: number;
  nCena: number;

  ipacijent: string;
  idatum: Date;
  ivreme: string;
  irazlogDolaska: string;
  idijagnoza: string;
  iterapija: string;
  inarednaKontrola: Date;

  //novi ne radni dan

  razN:string;
  odN:Date;
  doN:Date;

  ngOnInit(): void {
    this.show = false;
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;


    let ulogovan = localStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((u: User) => {
      this.reg = u;
      this.pregService.getAllVrsteSpec(this.reg.specijalizacija).subscribe((v: Vrste[]) => {
        this.vs = v;
      })
      this.getPreg()

    })
    this.userService.getAll().subscribe((us: User[]) => {
      this.allusers = us
    })
    this.pregService.getAllSpec().subscribe((s: Spec[]) => {
      this.spec = s;
    })

  }

addND()
{
  let a=new Date(this.odN)
  let b= new Date(this.doN)
  let now= new Date()
  if(a<now || b<now)
  {
    alert("Ne mozete uneti datum u proslosti!")
    return
  }
    let data={
    korIme:this.reg.korIme,
    od:a,
    do:b,
    razlog:this.razN
  }
  this.userService.addND(data).subscribe(()=>{
    alert("Uspesno ste dodali neradne dane")
    this.razN=null;
    this.odN=null;
    this.doN=null;
  })
}

  newVrsta() {
    const data = {
      naziv: this.nVrsta,
      specijalizacija: this.nSpec,
      trajanje: this.nTr,
      cena: this.nCena,
      odobren: false,
    }
    this.pregService.addVrsta(data).subscribe(() => {
      alert("Uspesno ste poslali zahtev za dodavanje nove vrste pregleda")
      this.nVrsta = null
      this.nSpec = null
      this.nTr = null
      this.nCena = null
    })
  }
  AddIzv() {
    this.inarednaKontrola = new Date(this.inarednaKontrola);
    this.idatum = new Date(this.idatum);
    let nw = new Date();
    let min = Number(this.ivreme.substring(3, 5))
    let h = Number(this.ivreme.substring(0, 2))

    if (!(0 <= min && min < 60 && h < 24 && h > 0)) {
      alert("Pogresno uneto vreme, ono mora biti u formatu hh::mm")
      return;
    }
    this.idatum.setHours(h, min)

    if (nw < this.idatum) {
      alert("Ne mozete dodati izvestaj za pregled koji se jos uvek nije dogodio")
      return
    }
    if (nw > this.inarednaKontrola) {
      alert("Naredna kontrola ne moze biti u proslosti")
      return
    }




    const data = {
      pacijent: this.ipacijent,
      datum: this.idatum,
      vreme: this.ivreme,
      lekar: this.reg.korIme,
      specijalizacija: this.reg.specijalizacija,
      razlogDolaska: this.irazlogDolaska,
      dijagnoza: this.idijagnoza,
      terapija: this.iterapija,
      narednaKontrola: this.inarednaKontrola
    }
    this.pregService.insertIzvestaj(data).subscribe(() => {
      alert("Uspesno ste dodali izvestaj!")

      this.ipacijent = null;
      this.idatum = null;
      this.ivreme = null;
      this.irazlogDolaska = null;
      this.idijagnoza = null;
      this.iterapija = null;
      this.inarednaKontrola = null;
      this.show3 = false

    })
  }
  getPreg() {
    this.pregService.pregDoc(this.reg.korIme, this.vrsta).subscribe((p: Preg[]) => {
      this.preg = p;
      for (let j of this.preg) {
        j.kraj = new Date(j.kraj)
        j.pocetak = new Date(j.pocetak)
      }
      this.preg = this.pregService.sort3(this.preg)
    })
  }
  logOut() {
    localStorage.clear()
    this.router.navigate([''])
  }
  p(a) {
    this.page = a;
    if (this.page == 1) {
      this.getPreg()

    }

  }
  getIme(pacijent) {
    let i = ""
    i = this.allusers.find(u => u.korIme == pacijent).ime
    return i
  }
  async update(tip) {
    let par;
    switch (tip) {
      case "slika":
        par = await toDataURL(this.userImage)
        break;
      case "brLicence":
        par = this.param[5];
        break;
      case "specijalizacija":
        par = this.param[4];
        break;
      case "tel":
        par = this.param[3];
        break;
      case "adresa":
        par = this.param[2];
        break;
      case "prezime":
        par = this.param[1];
        break;
      case "ime":
        par = this.param[0];
        break;
      default: {
        console.log("Invalid choice");
        break;
      }
    }
   
    this.userService.update(this.reg.korIme, tip, par).subscribe(() => {
      this.ngOnInit();
      this.param = [null, null, null, null, null]
    })
  }
  updatePregled() {

    this.pregService.updatePregled(this.zaOtkz, this.obrazlozenje).subscribe(() => {
      alert("Pregled uspesno otkazan")
      this.getPreg()
      this.obrazlozenje = ''
      this.show1 = false;
      this.zaOtkz = null
    })
  }
  lozinka() {
    localStorage.setItem('lozinka', this.reg.lozinka);
    this.router.navigate(['nova'])
  }
  showUpdate() {
    this.show = !this.show;

  }
  showOtkazi() {
    this.show1 = !this.show1;
    this.show2 = false
  }
  hideOtkaz() {
    this.show1 = false;
    this.show2 = false;
  }
  showAddIzv() {
    this.show3 = !this.show3
  }
  hideIzv() {
    this.show3 = false
  }
  Otkz(k) {
    this.zaOtkz = k;
    if (!this.show1) {
      this.show2 = true
    }


    this.pregService.izvUserDoSada(k.pacijent).subscribe((izv: Izv[]) => {
      this.izv = izv
      for (let j of this.izv) {
        j.datum = new Date(j.datum)
        j.narednaKontrola = new Date(j.narednaKontrola)
      }
    })

  }

  onFileSelected(event) {
    var reader = new FileReader();
    const selectedFile = event.target.files[0];

    const img = new Image();
    img.src = window.URL.createObjectURL(selectedFile);

    img.onload = () => {
      if ((img.width >= 300 || img.height >= 300) || (img.width < 100 || img.height < 100)) {
        alert('Slika nije dobrih dimenzija');
        this.userImage = "/assets/user.png";
        return
      }
    }

    reader.onload = (event: any) => {
      this.userImage = event.target.result;
      this.userImageFile = selectedFile;
    };

    reader.onerror = (event: any) => {
      console.log("Fajl ne moze da se procita" + event.target.error.code);
    };
    reader.readAsDataURL(event.target.files[0]);

  }
}

async function toDataURL(url) {

  var res = await fetch(url);
  var blob = await res.blob();

  const result = await new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  })

  return result
}


