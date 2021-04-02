import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { GlobalConstants } from '../../common/global-constants'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  logout(): void {
     console.log("logging out");
     this.authService.doLogout();
  }
  ngOnInit(): void {
      //console.log(this.authService.currentUser);
  }
  getCurrentUserName(): string {
      return this.authService.currentUserName();
  }
}
