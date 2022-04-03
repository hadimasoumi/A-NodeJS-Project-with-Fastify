import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../utils/loading.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoadingService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('spinner')) {
      this.loaderService.show();
      req = req.clone({ headers: req.headers.delete('spinner') });
      return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    } else {
      return next.handle(req);
    }
  }
}
