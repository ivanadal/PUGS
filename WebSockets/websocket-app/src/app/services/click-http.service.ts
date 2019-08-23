import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpClickService{

    constructor (private http: HttpClient){

    }

    click(): Observable<any> {
        
        return this.http.post("http://localhost:52295/api/click", "", {headers:{"Accept": "text/plain"}});
    }
}