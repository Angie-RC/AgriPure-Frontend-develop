import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogAddPlotComponent } from 'src/app/components/dialog-add-plot/dialog-add-plot.component';
import { DialogDeleteParcelComponent } from 'src/app/components/dialog-delete-parcel/dialog-delete-parcel.component';
import { Plot } from './model/Plot';
import { PlotsService } from './service/plots.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],
})
export class PlotsComponent implements OnInit {
  name: string | undefined;
  plots: Plot[] = [];
  plotsView: Plot[] = [];
  userId?:number;
  constructor(private plotsService: PlotsService, public dialog: MatDialog,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['userId'];  // Obtener userId de la URL
      console.log(this.userId); // Verificar que el userId es correcto
      if (this.userId) {
        this.loadPlots();  // Si existe el userId, cargar los plots
      } else {
        // Manejar el caso en el que no haya userId
        console.error('userId no encontrado');
      }
    });
  }
// Cargar los plots asociados al userId
  loadPlots(): void {
    if (this.userId) {
      this.plotsService.getPlotsByUser(this.userId).subscribe((response: any) => {
        console.log('Plots response:', response);  // Verifica qué datos vienen en la respuesta
        this.plots = response;
        this.plotsView = response;
      });
    }
  }
  openDialogAddPlot(): void {
    const dialogRef = this.dialog.open(DialogAddPlotComponent, {
      width: '400px',
      data: {
        userId: this.userId,
      },
    });
  }
  openDialogDeleteParcel() {
    const dialogRef = this.dialog.open(DialogDeleteParcelComponent, {
      width: '400px',
      data: {},
    });
  }
}
