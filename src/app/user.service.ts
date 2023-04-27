import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { throwError, Observable  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService { 
  SERVER_URL: string = "http://localhost:4200/restcontra/uplod";  
  constructor(private http: HttpClient,
  private router: Router) { }
  
  public upload(formData:any): Observable<any> {
    console.log("upload service function is called")
    console.log(formData.value)
    return this.http.post(this.SERVER_URL, formData,
      {  
        reportProgress: true,  
        observe: 'events'  ,responseType: 'text',
      }).pipe(
      map( event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );  
  
  }
  private getEventMessage(event: HttpEvent<any>, formData:any) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
		break;
      case HttpEventType.Response:
        return this.apiResponse(event);
		break;
      default:
        return `File "${formData.fileName}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event:any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event:any) {
    console.log('response api '+event.body);
    return event.body;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
