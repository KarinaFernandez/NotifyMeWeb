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
    console.log(index);
    let incident = this.incidents[index];
    console.log(incident);

    this.incidentService.disableIncident(incident._id, !incident.habilitado).subscribe((a: any) => {
      if (a.codigo == 409 || a.codigo == 404 || a.codigo == 400 ) {
        this.errMsg = a.mensaje;
      } else {
        this.getIncidents();
      }
    })
  }
}
