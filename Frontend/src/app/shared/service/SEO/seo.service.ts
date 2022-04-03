import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private location: Location
  ) {}

  seoFriendlyMaker({
    title,
    description,
    keywords,
    imageSrc,
    ogtype = 'website',
    domain,
    follow = true,
  }: {
    title: string;
    description: string;
    keywords: string;
    imageSrc: string;
    ogtype: 'website' | 'product';
    domain: string;
    follow?: boolean;
  }) {
    this.title.setTitle(title);
    this.meta.addTags([
      { charset: 'UTF-8' },
      { name: 'description', content: description },
      follow
        ? { name: 'robots', content: 'INDEX, FOLLOW' }
        : { name: 'robots', content: 'NOINDEX, NOFOLLOW' },
      { name: 'author', content: 'Andisheh Computer' },
      { name: 'keywords', content: keywords },
      { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' },
      { httpEquiv: 'Content-Language', content: 'fa' },
      { property: 'og:locale', content: 'fa_IR' },
      { property: 'og:title', content: title },
      { property: 'og:type', content: ogtype },
      { property: 'og:description', content: description },
      {
        property: 'og:url',
        content: environment.hostname + this.location.path(),
      },
      { property: 'og:site_name', content: domain }, // name of the domain
      { property: 'og:image', content: imageSrc },
      { property: 'og:image:width', content: '200' },
      { property: 'og:image:height', content: '200' },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:description', content: description },
      { property: 'twitter:title', content: title },
      { property: 'twitter:image', content: imageSrc },
    ]);
  }
}
