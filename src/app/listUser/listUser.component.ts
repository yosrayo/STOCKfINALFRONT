import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './listUser.component.html',
  styleUrls: ['./listUser.component.scss']
})
export class ListUserComponent implements OnInit {
  list = {} as any ;
  user:User;
  name :  string;
  fil :string;
  constructor(private userService:UserService,  private httpClient: HttpClient) { }

  ngOnInit() {
    
    this.userService .getUsers().subscribe((res) => {
      this.list = res;
      
      console.log("societe",this.list);
      this.user=new User();
    });
  }
  searche(){
    if (this.name != ""){
      if(this.fil=="First name"){
      this.list = this.list.filter(res=>{
        return res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }else if (this.fil=="Last name"){
      this.list = this.list.filter(res=>{
        return res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    } else if (this.fil=="Address"){
      this.list = this.list.filter(res=>{
        return res.address.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    } 
    }else if(this.name==""){
      this.ngOnInit();
    }

  }

  onDelete(_id: string) {
    if (confirm('Voulez-vous vraiment supprimer cet enregistrement ?') === true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }

}
