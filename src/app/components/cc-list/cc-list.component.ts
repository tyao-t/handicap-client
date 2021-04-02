import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { GlobalConstants } from '../../common/global-constants'
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-cc-list',
  templateUrl: './cc-list.component.html',
  styleUrls: ['./cc-list.component.css']
})
export class CcListComponent implements OnInit {

    contests: any = [];
    currentContest: any = {_id: '-1'};
    csts: any[] = [];
    sname: string = "";
    page = 1;
    pageSize = 5;
    curCst: any = undefined;
    rM: any;

    constructor(private http: HttpClient, private router: Router, public authService: AuthService) { }

    ngOnInit(): void {
        this.retrieveContests();
    }

    setActiveContest(contest: any): void {
          this.currentContest = contest;
          this.csts = contest.csts;
    }

    retrieveContests(): void {
      this.http.get(GlobalConstants.apiURL+'contests').subscribe(
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

    onTableDataChange(event: any) {
        this.page = event;
        this.retrieveContests();
    }

    setActiveCst(cst: any): void {
        this.curCst = cst;
    }

    placeBet(): void {
        const data = {
            contestName: this.currentContest.name,
            cst: this.curCst,
            riskAmount: this.rM
        }
        this.http.post(GlobalConstants.apiURL+'history/'+this.authService.currentUserId(), data).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/history']);
            },
            error => {
                console.log(error);
            }
        );
    }
}
