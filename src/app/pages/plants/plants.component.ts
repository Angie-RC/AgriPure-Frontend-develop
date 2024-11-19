import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Plants } from './model/Plants';
import { PlantsService } from './service/plants.service';
import {UsersService} from "../../authentication/services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css'],
})
export class PlantsComponent implements OnInit, OnChanges {
  plants: Plants[] = [];
  plantsView: Plants[] = [];
  input: string = '';
  messageSubtitle: string = 'Your Plants: ';
  userId!: number;  // Aquí el userId es dinámico

  constructor(
    private plantsService: PlantsService,
    private route: ActivatedRoute  // Inyectamos ActivatedRoute para capturar parámetros de la URL
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    // Captura dinámica del userId desde la ruta o algún estado global
    this.route.params.subscribe((params) => {
      this.userId = +params['userId'];  // Asegurar conversión a número
      this.loadPlants();  // Cargar las plantas del usuario
    });
  }

  loadPlants(): void {
    this.plantsService.getAllPlantsByUserId(this.userId).subscribe((response: any) => {
      this.plants = response;
      this.updatePlantView();
    });
  }

  updatePlantView(): void {
    this.plantsView = this.plants.filter((res) => res.saved === true);
  }

  Search(): void {
    if (this.input !== '') {
      this.messageSubtitle = 'Similar results: ';
      this.plantsView = this.plants.filter((res) =>
        res.name.toLocaleLowerCase().match(this.input.toLocaleLowerCase())
      );
    } else {
      this.messageSubtitle = 'Your plants: ';
      this.updatePlantView();
    }
  }
}
  /*
  plants: Plants[] = [];
  plantsView: Plants[] = [];
  input: string = '';
  messageSubtitle: string = 'Your Plants: ';

  constructor(private plantsService: PlantsService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.plantsService.getAllPlantsByUserId(1).subscribe((response: any) => {
      this.plants = response;
    });

  }

  Search() {
    if (this.input != '') {
      this.messageSubtitle = 'Similar results: ';
      this.plantsView = this.plants.filter((res) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.input.toLocaleLowerCase());
      });
    } else if (this.input == '') {
      this.messageSubtitle = 'Your plants: ';
      this.plantsView = this.plants.filter((res) => {
        return res.saved == true;
      });
    }
  }*/

