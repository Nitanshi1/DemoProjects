import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddDishComponent } from './shared/components/add-dish/add-dish.component';
import { EditDishComponent } from './shared/components/edit-dish/edit-dish.component';
import { MenuComponent } from './features/menu/menu.component';
import { SearchComponent } from './shared/components/search/search.component';

export const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: 'full' },
    {path:'dashboard',component:DashboardComponent},
    {path:'add',component:AddDishComponent},
    {path:'menu',component:MenuComponent},
    {path:'edit/:id',component:EditDishComponent},
    {path:'search',component:SearchComponent},
    

];
