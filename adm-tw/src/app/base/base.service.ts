import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

export class BaseService<T> {
    protected apiUrl = environment.apiUrl;

    constructor(
        protected http: HttpClient,
        private endpoint: string
    ) { }

    get(): Observable<T[]> {
        return this.http.get<T[]>(`${this.apiUrl}/${this.endpoint}`);
    }

    getById(id: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${this.endpoint}/${id}`);
    }

    save(obj: T): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${this.endpoint}`, obj);
    }

    update(id: string, obj: T): Observable<T> {
        return this.http.patch<T>(`${this.apiUrl}/${this.endpoint}/${id}`, obj);
    }
}
