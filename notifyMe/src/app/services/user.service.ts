import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;
  users;

  constructor(
    private http: HttpClient
  ) {}

  isLoggedIn(){
    return !!this.user;
  }

  getUser() {
    return this.user;
  }

  setUser(user){
    this.user = user;
  }

  setUsers(users) {
    this.users = users;
  }

  register(nombre, apellido, email, contraseña, admin ){
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ nombre, apellido, email, contraseña, admin });
    return this.http.post("https://notify-me-server.herokuapp.com/registro", body,{ headers })
  }

  login(email, contraseña) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email, contraseña});
    return this.http.post("https://notify-me-server.herokuapp.com/login", body,{ headers });
  }

  getUsers() {
    const headers = { 'Content-Type': 'application/json' };
    // const params = new HttpParams().append('id', this.userService.getUser().id);
    return this.http.get("https://notify-me-server.herokuapp.com/usuarios", { headers });
  }

  disableUser(idUsuario, activo) {
    const headers = { 'Content-Type': 'application/json' }; //, 'apiKey': this.userService.getUser().apiKey  };
    const body = JSON.stringify({ activo });
    const route = "https://notify-me-server.herokuapp.com/usuarios/" + idUsuario;
    return this.http.put(route, body, { headers });
  }

}