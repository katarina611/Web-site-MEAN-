import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-novaloz',
  templateUrl: './novaloz.component.html',
  styleUrls: ['./novaloz.component.css']
})
export class NovalozComponent implements OnInit {

  constructor(private router: Router,private userService: UserService) { }
  stara:string;
  nova0:string;
  nova1:string;
  error:string;
  un:string;
  pas:string;
  ngOnInit(): void {
    this.un=localStorage.getItem("ulogovan");
    this.pas=localStorage.getItem("lozinka");

  }
  update(){
    let regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,14}$" );
    let regex2 = new RegExp("^[A-Za-z][A-Za-z\\d@$!%*#?&]{1,}$")
    if(this.stara!=this.pas)
    {
      this.error="Stara lozinka nije dobra!";
      return
    }
    if(this.nova0!=this.nova1)
    {
      this.error="Lozinke se ne poklapaju!";
      return
    }
    else if(!(regex.test(this.nova0)==true && regex2.test(this.nova0)==true))
    {
      this.error="Lozinka mora da ima 8-14 karaktera, 1 veliko slovo, 1 broj, 1 specijalni karatker i mora poceti karakterom"
     return
    }
    
    this.userService.update(this.un,"lozinka",this.nova0).subscribe(()=>{
      alert("Uspesno promenjena lozinka");
      localStorage.removeItem("lozinka");
      this.router.navigate(["pacijent"])
    })


  }
}
