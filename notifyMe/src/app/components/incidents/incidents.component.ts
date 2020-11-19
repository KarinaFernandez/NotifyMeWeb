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
  filteredIncidents = [];
  titles = [];
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

      this.filteredIncidents = a;

      if (this.incidents.length > 0) {
        this.titles = ["Fecha", "Titulo", "Tipo", "Coordenadas", "Usuario", "Habilitado"];
      }
    })
  }

  disableIncident(index) {
    console.log(index);
    let incident = this.incidents[index];
    console.log(incident);

    this.incidentService.disableIncident(incident._id, !incident.habilitado).subscribe((a: any) => {
      if (a.codigo == 409 || a.codigo == 404 || a.codigo == 400) {
        this.errMsg = a.mensaje;
      } else {
        this.getIncidents();
      }
    })
  }

  applyFilter(titulo: String) {
    let filterValueLower = titulo.toLowerCase();
    if (titulo === '') {
      this.filteredIncidents = this.incidents;
    } else {
      this.filteredIncidents = this.incidents.filter((incident) => incident.titulo.toLowerCase().includes(filterValueLower));
    }
  }

  applyFilterByDay(day: String) {
    console.log(day);
    this.filteredIncidents = this.incidents.filter((incident) => incident.fecha.equals(day));
  }
}
