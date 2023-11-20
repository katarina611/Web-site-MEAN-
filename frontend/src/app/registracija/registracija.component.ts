import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Path } from 'mongoose';
import {Buffer} from "buffer"
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getAllUN().subscribe((un:string[])=>{
      this.UNS=un;
    });
    this.userService.getblockedEmails().subscribe((email:string[])=>{
      this.blockedEmails=email;
    })

    
  }
UNS:string[]
ime: string;
prezime: string;
korIme: string;
lozinka: string;
adresa:string;
tel:number;
mejl:string;
tip: string;
pass:string
userImage:string="/assets/user.png";
userImageFile: File 
error:string
blockedEmails:string[];
async reg()
{
  
  let regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,14}$" );
  let regex2 = new RegExp("^[A-Za-z][A-Za-z\\d@$!%*#?&]{1,}$")
  if (this.korIme == "" || this.lozinka == ""|| this.ime == ""|| this.prezime == "")
  {
    this.error="Niste uneli sve podatke!"
    return
  }
  for(let i of this.UNS)
  {
    if(i==this.korIme)
    {
      this.error="Ovo korisnicko ime postoji"
      return
    }
  }
  if(this.pass!=this.lozinka)
  {
    this.error="Lozinke se ne poklapaju!"
    return
  }
  else{
    if(!(regex.test(this.lozinka)==true && regex2.test(this.lozinka)==true))
    { 
      this.error="Lozinka mora da ima 8-14 karaktera, 1 veliko slovo, 1 broj, 1 specijalni karatker i mora poceti karakterom"
     return

    }
  }
  if(this.blockedEmails.find((b)=>b==this.mejl))
  {
    this.error="Ne mozete se prijaviti sa ovim mejlom"
    return
  }
  this.error=""
  let img= await toDataURL(this.userImage)
  const data={
    ime: this.ime,
    prezime: this.prezime,
    korIme: this.korIme,
    lozinka: this.lozinka,
    adresa:this.adresa,
    tel:this.tel,
    mejl:this.mejl,
    slika:img,
    tip: this.tip,
    odbijen:false
  }
  
  this.userService.input(data).subscribe(()=>{
    alert("Uspesno ste poslali zahtev za kreiranje naloga!")
    this.ngOnInit();
    this.ime=null;
    this.prezime=null
    this.korIme=null
    this.lozinka=null
    this.adresa=null
    this.tel=null
    this.mejl=null
    this.tip=null
    this.pass=null
    this.userImage="/assets/user.png"
  });

}

onFileSelected(event){
  var reader = new FileReader();
  const selectedFile = event.target.files[0];

  const img = new Image();
  img.src = window.URL.createObjectURL(selectedFile);

  img.onload = () => {
    if((img.width >=300 || img.height >=300)||(img.width <100 || img.height <100))
    {
      alert('Slika nije dobrih dimenzija');
      this.userImage="/assets/user.png";
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

async function toDataURL(url){
  
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