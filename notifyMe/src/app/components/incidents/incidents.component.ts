import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentService } from 'src/app/services/incidents.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  incidents = [];
  titulos = [];
  errMsg;

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents() {
    console.log("acaaaa");
    this.incidentService.getIncidents().subscribe((a: any) => {
      console.log(a);
      this.incidentService.setIncidents(a);
      this.incidents = a;

      if (this.incidents.length > 0) {
        this.titulos = ["Fecha", "Titulo", "Tipo", "Imagen", "Coordenadas", "Usuario", "Habilitado"];
      }
    })
  }

  disableIncident(index) {
    let idIncident = this.incidents[index].id;
    console.log(idIncident);
  }
}
