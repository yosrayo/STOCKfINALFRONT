import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  user = [] as any;
  users:User[];
  exist: boolean;
  list: User[];
  constructor(private formBuilder: FormBuilder , private userService:UserService) { }

  ngOnInit(): void {

    this.user=new User();
    this.userService.getUsers().subscribe((res) => {
      this.list = res;
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.exist=false;
    // stop here if form is invalid
    //if (this.registerForm.invalid) {
        //return;
   //}else {
    if (this.registerForm){
      this.user.firstName=this.firstName;
      this.user.lastName=this.lastName;
      this.user.email=this.email;
      this.user.password=this.password;;
      this.user.role="admin";
      for(let us of this.list){
        if(this.user.email==us.email){
          alert("email address email exist");
           this.exist=true;
          }
        }
        if(this.exist===false){
          
this.userService.create(this.user as User).subscribe(user=>{this.users.push(user)});
alert("ajouter avec succés");
     /* this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.address = '';
      this.phone = '';
      this.password = '';
      this.confirmPassword = '';*/
      //alert('SUCCESS!!');
    console.log(this.registerForm.value);
console.log('user',this.user)


   window.location.replace("login");
    }

}
//}
  }


}
