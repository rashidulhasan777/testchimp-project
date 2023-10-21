import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  authenticated!: boolean;
  constructor(private cookieService: CookieService) {}
  ngOnInit(): void {
    const token = this.cookieService.get('jwtToken');
    // console.log(token);
    if (token) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    // this.userService.getUser().subscribe(
    //   (res) => {
    //     if (res.id) {
    //       this.authenticated = true;
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.authenticated = false;
    //   },
    // );
  }
  logout() {
    this.authenticated = false;
    this.cookieService.removeAll();
  }
}
