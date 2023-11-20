import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Binary } from '@angular/compiler';
import { BSON } from 'bson';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.css']
})
export class PocComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

login:boolean=false;
reg:boolean=false;
doc:User[];

ngOnInit(): void {

    this.userService.getUsers("doktor").subscribe((u: User[]) => {
    this.doc = u;
    localStorage.setItem("tip",'')
    })
  }
on()
{
  this.reg=false;
  if(this.login)
    this.login=false;
  else
    this.login=true;

}
off()
{
  this.login=false;
  if(this.reg)
    this.reg=false;
  else 
    this.reg=true;

}
sortA(tip){
  this.doc=this.userService.sortA(this.doc,tip);
}
sortZ(tip){
  this.doc= this.userService.sortZ(this.doc,tip);
}
}
