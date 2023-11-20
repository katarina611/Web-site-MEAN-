import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Izv } from '../models/izvestaj';
import { PreglediService } from '../service/pregledi.service';
import { Preg } from '../models/pregledi';
import { BnNgIdleService } from 'bn-ng-idle';
import { Promo } from '../models/promocija';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private pregService: PreglediService, private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        localStorage.clear()
        this.router.navigate([''])
      }
    })
    let a = localStorage.getItem("tip")
    if (a != 'pacijent') {
      this.router.navigate([''])
    }
  }
  page: number = 0;
  reg: User;
  param = [];
  show: boolean;
  doc: User[];
  searchParam: string
  izv: Izv[];
  preg: Preg[];
  pregOtk: Preg[];
  pregDanas: Preg[];
  promos: Promo[]

  userImage: string = "/assets/user.png";
  userImageFile: File
  ngOnInit(): void {
    this.show = false;
    let ulogovan = localStorage.getItem("ulogovan");
    this.userService.getUser(ulogovan).subscribe((u: User) => {
      this.reg = u;
      this.pregService.izvUser(this.reg.korIme).subscribe((i: Izv[]) => {
        this.izv = i;
        for (let j of this.izv) {
          j.datum = new Date(j.datum)
          j.narednaKontrola = new Date(j.narednaKontrola)
        }
        this.izv = this.userService.sortIzv(this.izv)
      }
      )

      this.pregService.pregUser(this.reg.korIme).subscribe((p: Preg[]) => {
        this.preg = p;
        for (let j of this.preg) {
          j.kraj = new Date(j.kraj)
          j.pocetak = new Date(j.pocetak)

        }
        this.preg = this.userService.sortPreg(this.preg)

      })
      this.pregService.pregUserOtkz(this.reg.korIme).subscribe((p: Preg[]) => {
        this.pregOtk = p;
        for (let j of this.pregOtk) {
          j.kraj = new Date(j.kraj)
          j.pocetak = new Date(j.pocetak)

        }

      })
    })

    this.userService.getUsers("doktor").subscribe((u: User[]) => {
      this.doc = u;
    })
    this.pregService.getPromos().subscribe((p: Promo[]) => {
      this.promos = p;
      for (let j of this.promos) {
        j.od = new Date(j.od)
        j.do = new Date(j.do)
      }
    })


  }

  logOut() {
    localStorage.clear()
    this.router.navigate([''])
  }
  StranicaLekara(un) {
    localStorage.setItem("doktor", un);
    localStorage.setItem("tip", 'stranicaLekara')
    this.router.navigate(['stranicaLekara'])
  }
  p(a) {
    this.page = a;
    if(a==3)
    {
      let now = new Date()
      let now24 = new Date()
      now24.setDate(now.getDate() + 1)
      let prDns=[]
      for (let j of this.preg) {
        j.kraj = new Date(j.kraj)
        j.pocetak = new Date(j.pocetak)
        if (j.pocetak >= now && j.pocetak <= now24) {
          prDns.push(j)
        }

      }
      this.pregDanas=prDns
    }

  }
  async update(tip) {
    let par;
    switch (tip) {
      case "slika":
        par = await toDataURL(this.userImage)
        break;
      case "mejl":
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
    })
  }
  lozinka() {
    localStorage.setItem('lozinka', this.reg.lozinka);
    this.router.navigate(['nova'])
  }
  showUpdate() {
    this.show = !this.show;

  }
  sortA(tip) {
    this.doc = this.userService.sortA(this.doc, tip);
  }
  sortZ(tip) {
    this.doc = this.userService.sortZ(this.doc, tip);
  }
  search() {
    this.userService.search(this.searchParam).subscribe((d: User[]) => {
      this.doc = d;

    })
  }
  getDoc(un, tip) {
    let i = ""
    if (tip == "ime") {
      i = this.doc.find(d1 => d1.korIme == un).ime
      return i
    }
    else if (tip == "spec") {
      i = this.doc.find(d1 => d1.korIme == un).specijalizacija

      return i
    }
    else return i = this.doc.find(d1 => d1.korIme == un).ogranak

  }
  deletePreg(un, date, lekar) {

    this.pregService.deletePreg(un, date, lekar).subscribe(() => {
      this.ngOnInit()
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



