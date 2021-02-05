import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { GlobalConstants } from '../../common/global-constants'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  currentContest: any;
  newCst: any;
  newWnr: any;

  constructor(    private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient) { }

  ngOnInit(): void {
      this.retrievePatient();
  }

  addContestant(): void {
      this.newCst = this.newCst.trim();
      if (this.newCst == "") {
          alert("Please add a non-empty contestant!")
          return;
      }
      const arr: any[] = this.newCst.split(" ");
      let data = {
          name: "",
          odds: arr[arr.length-1],
      }
      for (let i=0;i<arr.length-1;++i) {
          data.name += arr[i] + " ";
      }
      data.name = data.name.trim();
      this.currentContest.csts.push(data);
      this.currentContest.csts.sort((x: any, y: any) => x.odds - y.odds);
      this.newCst = "";
  }

  addWnr(): void {
      this.newWnr = this.newWnr.trim();
      if (this.newWnr == "") {
          alert("Please add a non-empty winner!")
          return;
      }
      this.currentContest.wnrs.push(this.newWnr);
      this.newWnr = "";
  }

  updateContest(): void {
      const data = {
        name: this.currentContest.name,
        csts: this.currentContest.csts,
        over: this.currentContest.over,
        wnrs: this.currentContest.wnrs
      };

      this.http.put(GlobalConstants.apiURL+'admin/contests/' + this.currentContest._id, data).subscribe(
          response => {
              console.log(response);
              this.router.navigate(['/admin/contests']);
          },
          error => {
              console.log(error);
          }
      );
  }

  retrievePatient(): void {
    this.http.get(GlobalConstants.apiURL+'admin/contests/' + this.route.snapshot.params.id).subscribe(
        data => {
            this.currentContest = JSON.parse(JSON.stringify(data));
        },
        error => {
            console.log(error);
        }
    );
  }

  deleteCst(i: number): void{
     this.currentContest.csts.splice(i, 1);
  }

  deleteWnr(i: number): void{
     this.currentContest.wnrs.splice(i, 1);
  }

  changeSCB(): void {
      this.currentContest.over = !this.currentContest.over;
  }
}
