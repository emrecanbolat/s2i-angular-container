import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeLineStyle = {
    left: '',
    width: ''
  };

  constructor() { }

  ngOnInit() {

  }

  setActive(e) {
    this.activeLineStyle = {
      left: e.currentTarget.parentElement.offsetLeft + 'px',
      width: e.currentTarget.parentElement.clientWidth + 'px'
    }
  }

}
