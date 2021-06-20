import { Routes } from '@angular/router';


import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';

import { AdminGuard } from '../../guards/admin.guard';
import { ListUserComponent } from 'src/app/listUser/listUser.component';











export const AdminLayoutRoutes: Routes = [
   
   
   
  
    { path: 'user-profile',   component: UserProfileComponent  ,canActivate: [AdminGuard] },
    { path: 'table-list',     component: TableListComponent  },
  
    { path: 'typography',     component: TypographyComponent ,canActivate: [AdminGuard] },
    { path: 'icons',          component: IconsComponent ,canActivate: [AdminGuard] },
    { path: 'list',        component: ListUserComponent  },
   
    
];
