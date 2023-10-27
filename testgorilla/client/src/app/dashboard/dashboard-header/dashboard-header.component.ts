import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styles: [],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() user!: User;
  mobileMenuOpen = false;
  activeMenu: string = 'assessments';
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {
    router.events.subscribe((_val) => {
      this.activeMenu = this.router.url.split('/')[2];
    });
  }

  ngOnInit(): void {}
  mobileMenuToggle() {
    const mobileMenu = document.querySelector('#mobile-menu');
    mobileMenu?.classList.toggle('hidden');
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  dropdownMenuToggle() {
    const dropdownMenu = document.querySelector('#user-menu-dropdown');
    dropdownMenu?.classList.toggle('hidden');
  }
  logout() {
    this.cookieService.removeAll();
    this.router.navigate(['/']);
  }
}
