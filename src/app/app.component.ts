import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'app works! ';
  public identity;
  public clienteElegido = null;
  public token;
  public cliente = null;

  constructor(
    private _userService: UserService
  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.cliente = this._userService.getCliente();

  }

  ngOnInit() {
    console.log("app.component cargado");
    let prov = this._userService.getCliente();
    if(prov){ this.cliente = prov;}
    else{this.cliente = null;}
    console.log(prov);
    console.log(this.cliente);
  }
}