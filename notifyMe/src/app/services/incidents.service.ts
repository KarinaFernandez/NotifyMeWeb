import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  expenses = [];
  types = [];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  setExpenses(expenses) {
    this.expenses = expenses;
  }

  setExpenseTypes(types) {
    this.types = types
  }

  getIncidents() {
    const headers = { 'Content-Type': 'application/json', 'apiKey': this.userService.getUser().apiKey };
    const params = new HttpParams().append('id', this.userService.getUser().id);
    return this.http.get("https://notify-me-server.herokuapp.com/incidentes", { headers, params });
  }

  getExpenseTypes() {
    const headers = { 'Content-Type': 'application/json', 'apiKey': this.userService.getUser().apiKey };
    return this.http.get("http://xpense.develotion.com/rubros.php", { headers });
  }

  addExpense(nombre, monto, idUsuario, idRubro) {
    const headers = { 'Content-Type': 'application/json', 'apiKey': this.userService.getUser().apiKey  };
    const body = JSON.stringify({ nombre, monto, idUsuario, idRubro});
    return this.http.post("http://xpense.develotion.com/gastos.php", body,{ headers });
  }

  removeExpense(idGasto) {
    const headers = { 'Content-Type': 'application/json', 'apiKey': this.userService.getUser().apiKey  };
    const body = JSON.stringify({ idGasto});
    return this.http.request('delete', "http://xpense.develotion.com/gastos.php", { body, headers });
  }

}
