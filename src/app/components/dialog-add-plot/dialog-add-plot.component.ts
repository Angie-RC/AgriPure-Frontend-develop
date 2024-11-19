import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Plot } from 'src/app/pages/plots/model/Plot';
import { PlotsService } from 'src/app/pages/plots/service/plots.service';

@Component({
  selector: 'app-dialog-add-plot',
  templateUrl: './dialog-add-plot.component.html',
  styleUrls: ['./dialog-add-plot.component.css'],
})
export class DialogAddPlotComponent {
  submitted = false;
  plotsList: Plot[] = [];

  newPlotForm = this.formBuilder.group({
    plantName: ['', { validators: [Validators.required], updateOn: 'change' }],
    size: ['', { validators: [Validators.required], updateOn: 'change' }],
    quantity: ['', { validators: [Validators.required], updateOn: 'change' }],
    latitude: ['', { validators: [Validators.required], updateOn: 'change' }],
    longitude: ['', { validators: [Validators.required], updateOn: 'change' }],
  });

  constructor(
    private formBuilder: FormBuilder,
    private plotsService: PlotsService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogAddPlotComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
    this.submitted = false;
  }

  submitForm() {
    this.submitted = true;

    let newPlot = {
      plantName: this.newPlotForm.get('plantName')?.value,
      size: this.newPlotForm.get('size')?.value,
      quantity: this.newPlotForm.get('quantity')?.value,
      latitude: this.newPlotForm.get('latitude')?.value,
      longitude: this.newPlotForm.get('longitude')?.value,
    };
    // @ts-ignore
    this.plotsService.createPlot(3,newPlot).subscribe();
    this.closeDialog();
  }
}
