import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalService {

    apiKey = 'a6955c91';
    apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

    yandexKey = 'trnsl.1.1.20190814T145809Z.34dca4ae96ee54f8.a6f0523ae7bf2d2e7556a9f98a6d4aedfec3efd5';
    yandexApiUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.yandexKey}&lang=en-ru&text=`;

    constructor() {}
}
