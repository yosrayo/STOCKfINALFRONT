import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
n:string;
p:string;
    constructor() {}

    ngOnInit(){
      this.n=JSON.parse(localStorage.getItem('nom'));
      this.p=JSON.parse(localStorage.getItem('prenom')); 
    }

   
    c() {
      if(localStorage.getItem('name') === '') {
        return false;
      } else {
        return true;
      }
    }
    logout() {
      window.location.replace("login");
      localStorage.setItem("name","")
    }
  
   
    
  
}
