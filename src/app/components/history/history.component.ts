import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../common/global-constants'
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private http: HttpClient, public authService: AuthService) { }

  history: any[] = [];
  rStr: any;
  wl: string[] = [];
  ngOnInit(): void {
      this.retrieveHistory();
  }

  retrieveHistory(): void {
      console.log(this.authService.currentUserId());
      this.http.get(GlobalConstants.apiURL+'history/'+this.authService.currentUserId()).subscribe(
          data => {
              this.history = JSON.parse(JSON.stringify(data));
              console.log(this.history);
              this.wl = [];
              for (let hist of this.history) {
                  this.http.post(GlobalConstants.apiURL+'hisc', {name: hist.contestName}).subscribe(
                      data => {
                          console.log(hist.contestName);
                          const wnrs = JSON.parse(JSON.stringify(data));
                          if (!wnrs || wnrs.length === 0) this.rStr = "In Progress";
                          else if (wnrs.indexOf(hist.cst.name) >=0) this.rStr = "W";
                          else this.rStr = "L";
                          this.wl.push(this.rStr);
                      },
                      error => {
                          console.log(error);
                      }
                  );
              }
          },
          error => {
              this.history = error;
              console.log(error);
          }
      );

  }

  clearAll(): void {
      this.http.delete(GlobalConstants.apiURL+'history')
   .subscribe(
     response => {
       console.log(response);
       this.retrieveHistory();
     },
     error => {
       console.log(error);
     });
  }
}
