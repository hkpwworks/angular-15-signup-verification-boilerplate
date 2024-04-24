import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { JCTService } from '../_services/jct.service';

@Component({ templateUrl: 'viws.component.html' })



export class VIWSComponent implements OnInit {
  viwses?: any[];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jctService: JCTService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.jctService.getAll()
      .pipe(first())
      .subscribe(viws => this.viwses = viws);
    }
 

  deleteAccount(id: string) {
    const account = this.viwses!.find(x => x.id === id);
    account.isDeleting = true;
    this.jctService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.viwses = this.viwses!.filter(x => x.id !== id)
      });
  }
  //customerName: string;
  //mobileNumber: string;
  //regNo: string;
  //serviceType: string;
  //dmsJC: string;
  //customerRemarks: string;


}
