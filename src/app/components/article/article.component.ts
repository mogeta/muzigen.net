import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {collection, doc, Firestore, getDoc, getDocs, limit, orderBy, query, Timestamp} from '@angular/fire/firestore';
import {IdleMonitorService} from '@scullyio/ng-lib';
import {Meta, SafeHtml, Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  article: Promise<Item>|null = null;

  constructor(private fs: Firestore,
              private route: ActivatedRoute,
              private title: Title,
              private ims: IdleMonitorService,
              private meta: Meta,
              private domSanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    // this.article = {title: '',};
    const articleID = this.route.snapshot.paramMap.get('id');

    // has not articleID
    if (articleID === null) {
      this.article = new Promise<Item>(async (resolve, reject) => {
        const c = collection(this.fs, 'blog_contents');
        const q = query(c, orderBy('created_date', 'desc'), limit(1));
        const i = getDocs(q);
        (await i).forEach(v => {
          return resolve(v.data()as Item);
        });
      });
      for (const el of (await this.article).elements){
        console.log(el);
        el.safeHTML = this.domSanitizer.bypassSecurityTrustHtml(el.source);
      }
      await this.ims.fireManualMyAppReadyEvent();
      return;
    }

    const ref = doc(this.fs, `blog_contents/${articleID}`).withConverter(ItemConverter);

    this.article = new Promise<Item>(async (resolve, reject) => {
      const docRef = await getDoc(ref);
      const data = docRef.data();

      const description = data.description;
      const ogpImage = data.ogp_image;
      this.updateMeta(data.title, description, ogpImage);

      for (const el of data.elements){
        console.log(el);
        el.safeHTML = this.domSanitizer.bypassSecurityTrustHtml(el.source);
      }

      resolve(data);
      await this.ims.fireManualMyAppReadyEvent();
    });
    // getDoc(ref).then((result) => {
    //   result
    // });

    // const resut = await getDoc(ref);
    // this.article = resut.data();
    // const description = this.article.hasOwnProperty('description') ? this.article.description : '';
    // const ogpImage = this.article.hasOwnProperty('ogp_image') ? this.article.ogp_image : '';
    // this.updateMeta(this.article.title, description, ogpImage);
    // await this.ims.fireManualMyAppReadyEvent();
  }

  private updateMeta(title: string, description: string, ogpImage: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@mogetta' });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://${environment.domain}/${this.route.snapshot.url.join('/')}`
    });
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({property: 'og:image', content: ogpImage});
  }

  safeHTML(str: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(str);
  }
}

export class Item {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public ogp_image: string,
    public content: string,
    public tag: string,
    public content_url: string,
    public markdown_url: string,
    public update_date: Timestamp,
    public created_date: Timestamp,
    public publish: boolean,
    public elements: Elements[],

  ) {
  }

  tostring(): string {
    return JSON.stringify(this);
  }
}

export class Elements{
  constructor(
    public source: string,
    public type: string,
    public safeHTML: SafeHtml,
  ) {
  }

  tostring(): string {
    return JSON.stringify(this);
  }
}

// Firestore data converter
const ItemConverter = {
  toFirestore(item: Item): any {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      ogp_image: item.ogp_image,
      content: item.content,
      tag: item.tag,
      content_url: item.content_url,
      markdown_url: item.markdown_url,
      update_date: item.update_date,
      created_date: item.created_date,
      publish: item.publish,
      elements: item.elements,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Item(
      data.id,
      data.title,
      data.hasOwnProperty('description') ? data.description : '',
      data.hasOwnProperty('ogp_image') ? data.ogp_image : '',
      data.content,
      data.tag,
      data.content_url,
      data.markdown_url,
      data.update_date,
      data.created_date,
      data.hasOwnProperty('publish') ? data.publish : true,
      data.hasOwnProperty('elements') ? data.elements : [],
    );
  }
};
