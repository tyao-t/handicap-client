import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddComponent } from './components/add/add.component';
import { DetailComponent } from './components/detail/detail.component';
import { ACListComponent} from './components/ac-list/ac-list.component';
import { CcListComponent} from './components/cc-list/cc-list.component';
import { HistoryComponent} from './components/history/history.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: 'log-in', component: SigninComponent },
    { path: 'sign-up', component: SignupComponent },
    {path: 'about', component: AboutComponent},
    {path: 'admin/add', component: AddComponent},
    {path: 'admin/contests/:id', component: DetailComponent},
    {path: 'admin/contests', component: ACListComponent},
    {path: 'lines', component: CcListComponent, canActivate: [AuthGuard]},
    {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
