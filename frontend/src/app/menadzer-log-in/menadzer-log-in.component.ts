import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-menadzer-log-in',
  templateUrl: './menadzer-log-in.component.html',
  styleUrls: ['./menadzer-log-in.component.css']
})
export class MenadzerLogInComponent implements OnInit {


  constructor(private router: Router, private userService: UserService) { }

  username: string = "";
  password: string = "";
  error: string='';
  tip: string;
    ngOnInit(): void {
      localStorage.setItem("mng",'')
    }
  login(){ 
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.userService.login(this.username, this.password, "menadzer").subscribe((u: User) => {
      if (u) {
        localStorage.setItem("ulogovan", u.korIme)
        localStorage.setItem("mng",'true')
        this.router.navigate(['menadzerLogedIn'])
      } else {
        this.error = "Pogresni podaci!";
        return;
      }
    })
  
}
}
