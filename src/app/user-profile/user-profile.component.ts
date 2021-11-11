import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  modifierForm: FormGroup;
  submitted = false;
  users = {} as any ;
  phone : string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  admin:string;
  n:string;
  p:string;
  constructor(private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('user'));
    this.firstName = this.users.firstName;
    this.lastName = this.users.lastName;
    this.address = this.users.address;
    this.phone = this.users.phone;
    this.email = this.users.email;
    this.password = this.users.password;
    this.confirmPassword = this.users.password;
    this.modifierForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      password: ['', [Validators.required, Validators.minLength(6)]],
     
  },{
    validator: MustMatch('password', 'confirmPassword')
});
this.admin = localStorage.getItem("admin");
this.n=JSON.parse(localStorage.getItem('nom'));
this.p=JSON.parse(localStorage.getItem('prenom'));
  }
  get f() { return this.modifierForm.controls; }

onSubmit() {
  
  this.users.firstName=this.firstName;
  this.users.lastName = this.lastName ;
  this.users.address=this.address ;
  this.users.phone=this.phone;
  this.users.email=this.email;
  this.users.password=this.password ;
  
    this.submitted = true
    this.userService.updateUser(this.users).subscribe();
    alert('SUCCESS!!');
    localStorage.setItem("user", JSON.stringify(this.users));
    localStorage.setItem("nom", JSON.stringify(this.users.firstName));
    localStorage.setItem("prenom", JSON.stringify(this.users.lastName));
    location.reload();
    // stop here if form is invalid
   if (this.modifierForm.invalid) {
        return;
    }else {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.address = '';
      this.phone = '';
      this.password = '';
      this.confirmPassword = '';
     
      alert('SUCCESS!!');
     
    
    }  
   

}
  onReset() {
      this.submitted = false;
      this.modifierForm.reset();
  }
}

