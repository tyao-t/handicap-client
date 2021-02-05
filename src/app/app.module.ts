import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent} from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { AddComponent } from './components/add/add.component';
import { DetailComponent } from './components/detail/detail.component';
import { ACListComponent} from './components/ac-list/ac-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NamePipePipe } from './pipe/name-pipe.pipe';
import { CcListComponent } from './components/cc-list/cc-list.component';
import { HistoryComponent } from './components/history/history.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    AddComponent,
    DetailComponent,
    NamePipePipe,
    ACListComponent,
    CcListComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
