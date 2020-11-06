import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;

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

}