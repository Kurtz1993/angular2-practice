import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { SidenavComponent} from "./components/sidenav/sidenav.component";
import { TopBarComponent} from "./components/top-bar/top-bar.component";
import { AuthService } from './services/auth.service';
import { AuthUser } from './types/types';
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, SidenavComponent, TopBarComponent],
  providers: [AuthService, HTTP_PROVIDERS]
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    let usr: AuthUser = {
      username: 'JackDoe',
      password: 'IloveBofi2!',
      isWeb: true,
      deviceDna: 'Super cool DNA!'
    };
    this.authService.login(usr)
      .then(res => {
        sessionStorage.setItem('username', usr.username);
        sessionStorage.setItem('fullName', res.fullName);
        sessionStorage.setItem('token', res.token);
      })
      .catch((err) => {
        alert(err.message || 'Could not authenticate, please refresh the page');
      });
  }
}
