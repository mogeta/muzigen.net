import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;
import {IdleMonitorService} from '@scullyio/ng-lib';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

export class Item {
  id: string;
  title: string;
  description: string;
  // tslint:disable-next-line:variable-name
  ogp_image: string;
  content: string;
  tag: string;
  // tslint:disable-next-line:variable-name
  content_url: string;
  // tslint:disable-next-line:variable-name
  update_date: Timestamp;
  // tslint:disable-next-line:variable-name
  created_date: Timestamp;
  toLocaleString: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  article;
  markdownUrl = '';
  storageUrl = 'https://firebasestorage.googleapis.com/v0/b/muzigen-net.appspot.com/o/markdown%2F';
  query = '?alt=media';

  constructor(private fs: Firestore,
              private route: ActivatedRoute,
              private title: Title,
              private ims: IdleMonitorService,
              private meta: Meta) {
  }

  async ngOnInit(): Promise<void> {
    this.article = {title: ''};
    const articleID = this.route.snapshot.paramMap.get('id');
    const ref = doc(this.fs, `blog_contents/${articleID}`);
    const resut = await getDoc(ref);
    this.article = resut.data();
    this.article.toLocaleString = this.article.created_date.toDate().toLocaleString();
    const description = this.article.hasOwnProperty('description') ? this.article.description : '';
    const ogpImage = this.article.hasOwnProperty('ogp_image') ? this.article.ogp_image : '';
    this.updateMeta(this.article.title, description, ogpImage);
    await this.ims.fireManualMyAppReadyEvent();
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
