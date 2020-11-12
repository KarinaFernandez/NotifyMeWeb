import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  incidents = [];
  types = [];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  setIncidents(incidents) {
    this.incidents = incidents;
  }

  getIncidents() {
    const headers = { 'Content-Type': 'application/json' };
    console.log(headers);
    // const params = new HttpParams().append('id', this.userService.getUser().id);
    // console.log(params);
    return this.http.get("https://notify-me-server.herokuapp.com/incidentes", { headers });
  }

  disableIncident(idIncident, habilitado) {
    const headers = { 'Content-Type': 'application/json' }; //, 'apiKey': this.userService.getUser().apiKey  };
    const body = JSON.stringify({ habilitado});
    const route = "https://notify-me-server.herokuapp.com/incidentes/" + idIncident;
    return this.http.put(route, body, { headers });
  }
}
