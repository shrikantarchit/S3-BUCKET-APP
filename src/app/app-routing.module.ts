import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: '', redirectTo: 'add', pathMatch: 'full' },
{path:"add" ,component:CreateuserComponent}
,
  { path: 'success', component: SuccessComponent },
  { path: 'add/:authorname/:acronym/:paperid', component: CreateuserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
