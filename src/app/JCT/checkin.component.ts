import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { JCTService } from '../_services/jct.service';

@Component({ templateUrl: 'checkin.component.html' })

export class CheckinComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jctService: JCTService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      customerName: ['', Validators.required],
      phone: ['', Validators.required],
      regNo: ['', Validators.required],
      serviceType: ['', Validators.required],
      dMSJC: ['', Validators.required],
      frontOfficeRemarks: ['', Validators.required],
    }
    );
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    console.log('Submit Details:', this.form.value);

    this.submitting = true;
    this.jctService.checkin(this.form.value)

      .pipe(first())
      .subscribe({

        next: () => {
          console.log('Submit Details:', this.form.value);
          this.alertService.success('JC Added Successfully.', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          console.log('Form submission error', error);
          this.alertService.error(error);
          this.submitting = false;
        }
      });
  }


  //customerName: string;
  //mobileNumber: string;
  //regNo: string;
  //serviceType: string;
  //dmsJC: string;
  //customerRemarks: string;


}
