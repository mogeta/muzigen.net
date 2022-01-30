import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {doc, Firestore, getDoc, Timestamp} from '@angular/fire/firestore';
import {IdleMonitorService} from '@scullyio/ng-lib';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  article: Promise<Item>|null = null;

  // markdownUrl = '';
  // storageUrl = 'https://firebasestorage.googleapis.com/v0/b/muzigen-net.appspot.com/o/markdown%2F';
  // query = '?alt=media';

  constructor(private fs: Firestore,
              private route: ActivatedRoute,
              private title: Title,
              private ims: IdleMonitorService,
              private meta: Meta) {
  }

  async ngOnInit(): Promise<void> {
    // this.article = {title: '',};
    const articleID = this.route.snapshot.paramMap.get('id');
    const ref = doc(this.fs, `blog_contents/${articleID}`).withConverter(ItemConverter);

    this.article = new Promise<Item>(async (resolve, reject) => {
      const docRef = await getDoc(ref);
      const data = docRef.data();

      const description = data.description;
      const ogpImage = data.ogp_image;
      this.updateMeta(data.title, description, ogpImage);

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
  ) {
  }

  tostring() {
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
    );
  }
};
