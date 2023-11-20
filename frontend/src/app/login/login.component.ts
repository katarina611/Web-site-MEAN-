import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
username: string = "";
password: string = "";
error: string='';
tip: string;
  ngOnInit(): void {
  }
login(){ 
  if (this.username == "" || this.password == "") {
    this.error = "Niste uneli sve podatke!";
    return;
  }
  this.error = "";
  this.userService.login(this.username, this.password, this.tip).subscribe((u: User) => {
    if (u) {
      localStorage.setItem("ulogovan", u.korIme)
      localStorage.setItem("tip",u.tip)
      this.router.navigate([u.tip])
    } else {
      this.error = "Pogresni podaci!";
      return;
    }
  })

}
}
