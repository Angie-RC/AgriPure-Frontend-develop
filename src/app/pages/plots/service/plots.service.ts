import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { TemplateService } from '../../../services/template.service';
import { Plot } from '../model/Plot';

@Injectable({
  providedIn: 'root',
})
export class PlotsService extends TemplateService<Plot> {
  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'https://agripureapi.onrender.com/users';
  }
  createPlot(userId: any, item: any): Observable<Plot> {
    return this.http
      .post<Plot>(
        `https://agripureapi.onrender.com/plots?userId=${userId}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getPlotsByUser(userId: number): Observable<Plot[]> {
    return this.http
      .get<Plot[]>(`https://agripureapi.onrender.com/plots?userId=${userId}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
