import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientServiceService } from '../../services/patient-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from '../../common/global-constants'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    name: string = "";
    curCst: string = "";
    csts: any[] = [];

    constructor(private http: HttpClient,
        private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
    }

    addContestant(): void {
        this.curCst = this.curCst.trim();
        if (this.curCst == "") {
            alert("Please add a non-empty contestant!")
            return;
        }
        const arr: any[] = this.curCst.split(" ");
        let data = {
            name: "",
            odds: arr[arr.length-1],
        }
        console.log(data);
        for (let i=0;i<arr.length-1;++i) {
            data.name += arr[i] + " ";
        }
        data.name = data.name.trim();
        this.csts.push(data);
        this.csts.sort((x, y) => x.odds - y.odds);
        this.curCst = "";
    }

    saveContest(): void {
        this.name = this.name.trim();
        if (this.name == "") {
            alert("Contest name must not be empty!");
            return;
        }
        const data = {
          name: this.name,
          csts: this.csts,
          over: false,
          wnrs: []
        };

        this.http.post(GlobalConstants.apiURL+'admin/contests', data).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['admin/contests']);
            },
            error => {
                console.log(error);
            }
        );
    }

}
