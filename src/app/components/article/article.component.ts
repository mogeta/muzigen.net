import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

export interface Item {
  id: string;
  title: string;
  content: string;
  tag: string;
  content_url: string;
  markdown_url: string;
  update_date: firebase.firestore.Timestamp;
  created_date: firebase.firestore.Timestamp;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  private articleDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  markdownUrl = '';
  storageUrl = 'https://firebasestorage.googleapis.com/v0/b/muzigen-net.appspot.com/o/markdown%2F';
  query = '?alt=media';

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {
    const articleID = this.route.snapshot.paramMap.get('id');
    this.articleDoc = firestore.doc<Item>(`blog_contents/${articleID}`);
    this.item = this.articleDoc.valueChanges();
    this.markdownUrl = `${this.storageUrl}${articleID}.md${this.query}`;
    console.log(this.markdownUrl);
  }
  ngOnInit(): void {

  }

}
