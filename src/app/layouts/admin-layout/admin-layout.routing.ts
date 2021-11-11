import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { ListUserComponent } from '../../listUser/listUser.component';
import { AdminGuard } from '../../guards/admin.guard';
import { HomeComponent } from '../../home/home.component';











export const AdminLayoutRoutes: Routes = [
   
   
   
  
    { path: 'user-profile',   component: UserProfileComponent  ,canActivate: [AdminGuard] },
    { path: 'table-list',     component: TableListComponent, canActivate: [AdminGuard] },
    { path: 'list',        component: ListUserComponent , canActivate: [AdminGuard] },
    { path: 'home',        component: HomeComponent , canActivate: [AdminGuard] },
   
    
];
