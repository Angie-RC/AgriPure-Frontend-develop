import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
// @ts-ignore
import { ToDo } from './model/Event';
import { EventService } from './services/event.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  selected: Date;
  userId!: number;
  eventData: ToDo;
  dataSource: MatTableDataSource<ToDo>;
  displayedColumns: string[] = ['actions', 'description'];

  @ViewChild('eventForm', { static: false })
  eventForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute // Para capturar el userId desde la ruta o contexto
  ) {
    this.eventData = {} as ToDo;
    this.dataSource = new MatTableDataSource<ToDo>();
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Configurar hora al inicio del día
    this.selected = now;
  }

  ngOnInit(): void {
    // Captura dinámica del userId desde la ruta o algún estado global
    this.route.params.subscribe((params) => {
      this.userId = +params['userId']; // Asegurar conversión a número
      this.loadData();
    });
  }

  /** Cargar eventos iniciales */
  loadData() {
    this.dataSource.paginator = this.paginator;
    this.getEventsByUser();
    this.getEventsByDate();
  }

  /** Obtener todos los eventos del usuario */
  getEventsByUser() {
    this.eventService.getAll(this.userId).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  /** Obtener eventos de la fecha seleccionada */
  getEventsByDate() {
    this.eventService.getByDate(this.userId, this.selected).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  /** Manejar cambios en la fecha seleccionada */
  handleDateChange(date: Date|null) {
    if (date) {
      this.selected = date; // Solo asigna si no es null
      this.getEventsByDate();
    } else {
      console.error('La fecha seleccionada es null');
    }
  }

  /** Eliminar un evento por su ID */
  deleteEvent(id: number) {
    this.eventService.delete(this.userId, id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: ToDo) => o.id !== id);
    });
  }

  /** Añadir un nuevo evento */
  addEvent() {
    this.eventData.id = 0; // ID generado automáticamente por la API
    this.eventData.date = this.selected; // Fecha seleccionada

    this.eventService.create(this.userId, this.eventData).subscribe((response) => {
      this.dataSource.data.push({ ...response }); // Añadir el evento a la tabla
      this.dataSource.data = [...this.dataSource.data]; // Forzar actualización de la tabla
    });

    this.eventForm.resetForm(); // Resetear el formulario después de enviar
  }

  /** Manejar envío del formulario */
  onSubmit() {
    if (this.eventForm.form.valid) {
      this.addEvent();
    } else {
      console.error('Formulario inválido');
    }
  }
}
  /*
  selected: Date;

  userId = 1;

  eventData: ToDo;
  dataSource: MatTableDataSource<ToDo>;
  displayedColumns: string[] = ['actions', 'description'];

  @ViewChild('eventForm', { static: false })
  eventForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private eventService: EventService) {
    this.eventData = {} as ToDo;
    this.dataSource = new MatTableDataSource<ToDo>();
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    this.selected = now;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getEventsbyDate();
    this.eventService.getAll(this.userId).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  getEventsbyDate() {
    this.eventService.getByDate(this.selected).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  handleDateChange(date: Date) {
    this.selected = date;
    this.getEventsbyDate();
  }

  deleteEvent(id: number) {
    this.eventService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: ToDo) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addEvent() {
    this.eventData.id = 0;
    this.eventData.date = this.selected;
    this.eventService
      .create(this.userId, this.eventData)
      .subscribe((response) => {
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data.map((o) => {
          return o;
        });
      });
    this.eventForm.resetForm();
  }

  onSubmit() {
    if (this.eventForm.form.valid) {
      console.log('valid');
      console.log('about to add');
      this.addEvent();
    } else {
      console.log('invalid data');
    }
  }
}
*/

