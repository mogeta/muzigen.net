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

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {
    const articleID = this.route.snapshot.paramMap.get('id');
    this.articleDoc = firestore.doc<Item>(`blog_contents/${articleID}`);
    this.item = this.articleDoc.valueChanges();
  }

  ngOnInit(): void {

  }

}
