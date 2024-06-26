import { Component, OnInit } from '@angular/core';
import { ClaimService } from '@app/_services/claim.service';
import { Claim } from '@app/_models/claim';

@Component({
  selector: 'app-claimadmin',
  templateUrl: './claimadmin.component.html',
  styleUrls: ['./claimadmin.component.css']
})
export class ClaimadminComponent implements OnInit {
  claims: Claim[] = [];

  constructor(private claimService: ClaimService) { }

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims() {
    this.claimService.getAll().subscribe(
      data => {
        this.claims = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}