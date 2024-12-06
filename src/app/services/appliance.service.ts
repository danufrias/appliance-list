import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AppliancesService {
    private API_URL = 'https://random-data-api.com/api/v2/appliances';

    constructor(private http: HttpClient) {}

    getAppliances(p0: number): Observable<any[]> {
        const firstRequest = timer(0).pipe(switchMap(() => this.http.get<any[]>(`${this.API_URL}?size=100`)));
        const secondRequest = timer(2000).pipe(switchMap(() => this.http.get<any[]>(`${this.API_URL}?size=20`)));

        return forkJoin([firstRequest, secondRequest]).pipe(
            map((responses) => [...responses[0], ...responses[1]])
        );
    }
}
