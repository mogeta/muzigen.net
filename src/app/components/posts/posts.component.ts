import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';

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
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private firestore: AngularFirestore) {
    this.itemsCollection = firestore.collection<Item>('blog_contents', ref => ref.orderBy('update_date', 'desc'));
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
