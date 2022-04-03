import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ReCaptchaService {
  constructor(
    private reCaptchaV3Service: ReCaptchaV3Service,
    public loading: LoadingService
  ) {}

  public async getRecaptchaToken(action, spinner = true) {
    if (spinner) this.loading.show();

    return new Promise((resolve, reject) => {
      this.reCaptchaV3Service.execute(
        environment['reCaptcha'],
        action,
        (token) => {
          if (token) {
            if (spinner) this.loading.hide();
            resolve(token);
          } else resolve('error');
        }
      );
    });
  }
}
