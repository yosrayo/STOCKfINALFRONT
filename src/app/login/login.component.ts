import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  user: User;
  users:User[];
  b=false;
  h: any;
  g:any;
  list:User[];
  gr=false;
  constructor(private router: Router  ,private userService:UserService) { }
 

  ngOnInit() {
  
    this.userService .getUsers().subscribe((res) => {
      this.list = res;
    });
    this.user= new User();
    this.getUsers();
    localStorage.clear();
  }
  
  getUsers()
  {
    this.userService.getUsers().subscribe(users => this.users = users);
    console.log("jjj", this.users);
  }

  get f() { return this.loginForm.controls; }
  
  
  
  connexion()

  {
   
for(let us of this.users)
{
  
 
  if((this.user.email==us.email)&&(this.user.password==us.password))
 { 
this.b=true;
this.h = us ;
localStorage.setItem("role",JSON.stringify(this.h.role));
localStorage.setItem("nom",JSON.stringify(this.h.firstName));
localStorage.setItem("prenom",JSON.stringify(this.h.lastName));
localStorage.setItem("user",JSON.stringify(this.h));
localStorage.setItem("name","name");
sessionStorage.setItem("n","name");
window.location.replace("table-list") 

 }
}
}
}
