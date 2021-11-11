import { Component, OnInit, ElementRef } from '@angular/core';



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

   
    logout() {
      localStorage.removeItem(this.n);
      window.location.replace("login");
      sessionStorage.clear();
  
    }
  
   
    
  
}
