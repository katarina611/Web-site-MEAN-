import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { Spec } from '../models/specijalizacija';
import { PreglediService } from '../service/pregledi.service';
import { Zah } from '../models/zahtevi';
import { Vrste } from '../models/vrstep';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private pregService: PreglediService,private bnIdle: BnNgIdleService) { 
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {
        localStorage.clear()
        this.router.navigate([''])
      }
    })
    let a=localStorage.getItem("mng")
    if(a=="")
    {
      this.router.navigate([''])
    }
    localStorage.removeItem("mng")
  }
  page: number = 0;
  param = [];
  doc: User[];
  pac: User[]
  show0: boolean//add lekara
  show1: boolean//update
  //Za doavanje usera
  UNS: string[]
  ime: string;
  prezime: string;
  korIme: string;
  lozinka: string;
  adresa: string;
  tel: number;
  mejl: string;
  pass: string
  brLicence: number
  spec: string
  ogranak: string
  //Za sliku 
  userImage: string = "/assets/user.png";
  userImageFile: File
  SveSpec: Spec[]
  error: string
  //Za update usera
  UpdateUser: User
  tip: string
  updateTo: string
  //Za zahtev
  zah: Zah[]
  vs: Vrste[]
  //Za dodavanje spec
  newSpec: string
  //Za dodavanje i update vrste
  vsOdobrene: Vrste[]
  showAddVr: boolean
  showUpdateVr: boolean
  nVrsta: string;
  nSpec: string;
  nTr: number;
  nCena: number;
  tipVrsta:string
  updateNazV:string //naziv vrste koja se updejtuje
  paramVrste:string


  //Nova promocija
  promoVrsta:string;
  promoOd:Date;
  promoDo:Date;
  promoPobroju:number;
  promoPosto:String
  ngOnInit(): void {
    this.show0 = false
    this.show1 = false
    this.showAddVr = false
    this.userService.getUsers("doktor").subscribe((u: User[]) => {
      this.doc = u
    })
    this.userService.getUsers("pacijent").subscribe((u: User[]) => {
      this.pac = u
    })

    this.userService.getAllUN().subscribe((un: string[]) => {
      this.UNS = un;
    });
    this.pregService.getAllSpec().subscribe((s: Spec[]) => {
      this.SveSpec = s;
    })
    this.userService.getAllZah().subscribe((z: Zah[]) => {
      this.zah = z;
    })
    this.pregService.getAllVrste().subscribe((v: Vrste[]) => {
      this.vs = v
    })
    this.pregService.getAllVrste().subscribe((v: Vrste[]) => {
      this.vs = v
    })
    this.pregService.getAllVrsteSpec(this.spec).subscribe((v: Vrste[]) => {
      this.vsOdobrene = v
    })
  }

  p(a) {
    this.page = a;

  }
  showAddVrsta() {
    this.showAddVr = !this.showAddVr;
   
  }
  showUpdateVrsta(k)
  {
    if(!this.showUpdateVr)
    {
      this.updateNazV=null;
      this.paramVrste=null;
      this.tipVrsta=null
    }
    this.showUpdateVr=!this.showUpdateVr
    this.updateNazV=k;
    
  }
  logOut() {
    localStorage.clear()
    this.router.navigate([''])
  }
  addPromo(){
    let data
    if(this.promoVrsta=='vremenska')
    {
      data={
        od:new Date(this.promoOd),
        do:new Date(this.promoDo),
        tip:this.promoVrsta,
        brPuta:0,
        postoCene:this.promoPosto

      }
    }
    else
    {
      data={
        od:null,
        do:null,
        tip:this.promoVrsta,
        brPuta:Number(this.promoPobroju),
        postoCene:""

      }
    }
    this.pregService.addPromo(data).subscribe(()=>{
      alert("Uspesno ste dodali promociju!")
      this.promoVrsta=null;
      this.promoOd=null;
      this.promoDo=null;
      this.promoPobroju=null;
      this.promoPosto=null;
    })
    
  }
  updateVrstaEl(){
    this.pregService.updateVrstaEl(this.updateNazV, this.paramVrste,this.tipVrsta).subscribe(()=>{
      this.ngOnInit();
    })
  }
  newVrsta(){
    if(!this.nTr) this.nTr=30
    const data = {
      naziv: this.nVrsta,
      specijalizacija: this.spec,
      trajanje: this.nTr,
      cena: this.nCena,
      odobren: true,
    }
    this.pregService.addVrsta(data).subscribe(() => {
      alert("Uspesno ste dodali novu vrstu pregleda")
      this.ngOnInit();
      this.nVrsta=null
      this.nTr=null
      this.nCena=null
      this.spec=null
    })
  }
  showAddLekara() {
    this.show0 = !this.show0;
  }
  showUpdate(k) {
    this.show1 = !this.show1
    this.UpdateUser = k
  }
  async update() {
    if(this.tip=='slika')
    {
      let a= await toDataURL(this.userImage)
      this.updateTo=a.toString()
    }
    this.userService.update(this.UpdateUser.korIme, this.tip, this.updateTo).subscribe(() => {
      this.ngOnInit();
      this.show1 = false
      this.UpdateUser = null;
      this.tip = null
      this.updateTo = null
    })
  }

  deleteUser(k) {
    this.userService.deleteUser(k.korIme).subscribe(() => {
      alert("Uspesno ste obrisali korisnika!")
      this.ngOnInit()
    })
  }
  prihvatiZahtev(k) {
    const data = {
      ime: k.ime,
      prezime: k.prezime,
      korIme: k.korIme,
      lozinka: k.lozinka,
      adresa: k.adresa,
      tel: k.tel,
      mejl: k.mejl,
      tip: "pacijent",
      slika: k.slika,
    }
    this.userService.obrisiZahtev(data).subscribe(() => {
      this.userService.prihvatiZahtev(data).subscribe(() => {
        this.ngOnInit();
      })

    })
  }
  odbijZahtev(k) {
    this.userService.odbijZahtev(k.korIme).subscribe(() => {
      this.ngOnInit();
    })
  }
  prihvatiVrstu(k) {
    this.pregService.updateVrsta(k.naziv).subscribe(() => {
      this.ngOnInit();
    })
  }
  odbijVrstu(k) {
    this.pregService.deleteVrsta(k.naziv).subscribe(() => {
      this.ngOnInit();
    })
  }
  addSpec() {
    this.pregService.newSpec(this.newSpec).subscribe(() => {

      this.newSpec = ""
      this.ngOnInit();
    })
  }

  async AddLekara() {

    let regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,14}$");
    let regex2 = new RegExp("^[A-Za-z][A-Za-z\\d@$!%*#?&]{1,}$")
    if (this.korIme == "" || this.lozinka == "" || this.ime == "" || this.prezime == "") {
      this.error = "Niste uneli sve podatke!"
      return
    }
    for (let i of this.UNS) {
      if (i == this.korIme) {
        this.error = "Ovo korisnicko ime postoji"
        return
      }
    }
    if (this.pass != this.lozinka) {
      this.error = "Lozinke se ne poklapaju!"
      return
    }
    else {
      if (!(regex.test(this.lozinka) == true && regex2.test(this.lozinka) == true)) {
        this.error = "Lozinka mora da ima 8-14 karaktera, 1 veliko slovo, 1 broj, 1 specijalni karatker i mora poceti karakterom"
        return

      }
    }
    this.error = ""
    let img = await toDataURL(this.userImage)
    const data = {
      ime: this.ime,
      prezime: this.prezime,
      korIme: this.korIme,
      lozinka: this.lozinka,
      adresa: this.adresa,
      tel: this.tel,
      mejl: this.mejl,
      slika: img,
      tip: "doktor",
      brLicence: this.brLicence,
      specijalizacija: this.spec,
      ogranak: this.ogranak,

    }

    this.userService.inputDoc(data).subscribe(() => {
      alert("Uspesno ste dodali doktora!")
      this.spec = null
      this.ngOnInit();
    });

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
  console.log("Downloading image...");
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

