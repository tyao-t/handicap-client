import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddComponent } from './components/add/add.component';
import { DetailComponent } from './components/detail/detail.component';
import { ACListComponent} from './components/ac-list/ac-list.component';
import { CcListComponent} from './components/cc-list/cc-list.component';
import { HistoryComponent} from './components/history/history.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuard]
    },
    {path: 'about', component: AboutComponent},
    {path: 'admin/add', component: AddComponent},
    {path: 'admin/contests/:id', component: DetailComponent},
    {path: 'admin/contests', component: ACListComponent},
    {path: '', component: CcListComponent},
    {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
