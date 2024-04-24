import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account = this.accountService.accountValue;

  constructor(private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Navigate to the destination page after 5000 milliseconds (5 seconds)
    setTimeout(() => {
      this.router.navigate(['/jct/']); // Replace 'destination' with your actual route
    }, 5000);
  }
}
