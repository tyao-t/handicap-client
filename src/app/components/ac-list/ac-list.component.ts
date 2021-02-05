import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../common/global-constants'

@Component({
  selector: 'app-ac-list',
  templateUrl: './ac-list.component.html',
  styleUrls: ['./ac-list.component.css']
})
export class ACListComponent implements OnInit {

  contests: any = [];
  currentContest: any = {_id: '-1'};
  csts: any[] = [];
  sname: string = "";
  page = 1;
  pageSize = 5;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.retrieveContests();
  }

  setActiveContest(contest: any): void {
        this.currentContest = contest;
        this.csts = contest.csts;
  }

  retrieveContests(): void {
    this.http.get(GlobalConstants.apiURL+'admin/contests').subscribe(
        data => {
            this.contests = JSON.parse(JSON.stringify(data));
        },
        error => {
            this.contests = error;
            console.log(error);
        }
    );
  }

  refreshList(): void {
      this.retrieveContests();
      this.currentContest = {_id: '-1'};
  }

  removeAll(): void {
      this.http.delete(GlobalConstants.apiURL+'admin/contests')
   .subscribe(
     response => {
       console.log(response);
       this.refreshList();
     },
     error => {
       console.log(error);
     });
  }

  deleteCurContest(): void {
      this.http.delete(GlobalConstants.apiURL+'admin/contests/' + this.currentContest._id)
   .subscribe(
     response => {
       console.log(response);
       this.refreshList();
     },
     error => {
       console.log(error);
     });
  }

  onTableDataChange(event: any) {
      this.page = event;
      this.retrieveContests();
  }
}
