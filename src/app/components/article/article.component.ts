import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export class Item {
  id: string;
  title: string;
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
  article: Item = new Item();
  markdownUrl = '';
  storageUrl = 'https://firebasestorage.googleapis.com/v0/b/muzigen-net.appspot.com/o/markdown%2F';
  query = '?alt=media';

  constructor(private fs: Firestore, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    const articleID = this.route.snapshot.paramMap.get('id');
    const ref = doc(this.fs, `blog_contents/${articleID}`);
    const resut = await getDoc(ref);
    this.article = resut.data() as Item;
    this.article.toLocaleString = this.article.created_date.toDate().toLocaleString();
  }

}
