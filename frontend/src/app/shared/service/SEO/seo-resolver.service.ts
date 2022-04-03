import { Injectable } from '@angular/core';
import { HttpService } from '../utils';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SeoService } from './seo.service';
import { StaticService } from './static.service';

@Injectable({
  providedIn: 'root'
})
export class SeoResolverService {
  constructor(
    public httpService: HttpService,
    public seoService: SeoService,
    public staticService: StaticService
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const meta = this.staticService.staticMeta[state.url.split('?')[0]];
    if (meta) {
      this.seoService.seoFriendlyMaker({
        title: meta.title,
        description: meta.description,
        domain: meta.domain,
        imageSrc: meta.imageSrc,
        ogtype: meta.ogtype,
        keywords: meta.keywords
      });
    }

    return true;
  }
}
