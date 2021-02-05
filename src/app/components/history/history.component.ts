import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../common/global-constants'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  history: any[] = [];
  rStr: any;
  wl: string[] = [];
  ngOnInit(): void {
      this.retrieveHistory();
  }

  retrieveHistory(): void {
      this.http.get(GlobalConstants.apiURL+'history').subscribe(
          data => {
              this.history = JSON.parse(JSON.stringify(data));
              this.wl = [];
              for (let hist of this.history) {
                  this.http.post(GlobalConstants.apiURL+'history/checkWL', {name: hist.contestName}).subscribe(
                      data => {
                          console.log(hist.contestName);
                          const wnrs = JSON.parse(JSON.stringify(data));
                          console.log(wnrs);
                          if (wnrs.length === 0) this.rStr = "In Progress";
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
