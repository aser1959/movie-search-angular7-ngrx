import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GlobalService } from '@services/global.service';

@Injectable({ providedIn: 'root' })
export class YandexTranslateService {

    constructor( private http: HttpClient, private globalService: GlobalService) { }

    getYandexTtranslate(text: string): Observable<string> {
        return this.http.get<string>(`${this.globalService.yandexApiUrl}${text}`).pipe(
            map(( result: any ) => result.text),
            catchError(( error: any ) => {
                let errorStr: string;
                if ( error.error.message ) {
                    errorStr = error.error.message;
                } else {
                    errorStr = 'Попробуйте включить VPN !';
                }
                console.log('getYandexTtranslate -1234----', errorStr );
                return throwError( errorStr );
            })
        );
    }
}
