import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile } from 'src/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(
        public http: HttpClient
    ) { }

    /**
     *
     */
    public async fetch(): Promise<IProfile> {
        return this.http.get(environment.bucketUrl + 'data.json', { responseType: 'json' }).toPromise() as Promise<IProfile>;
    }
}
