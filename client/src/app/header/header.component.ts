import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  authenticated = false;
  user_name: any;
  profile: any;

  constructor() { }

  ngDoCheck() {
  }

  isLogged(){

  }

  logout(){

  }

}
