import {Component, OnInit} from '@angular/core';
import {
  Firestore,
  collection,
  query,
  orderBy,
  getDocs,
} from '@angular/fire/firestore';
import firebase from 'firebase/compat';

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
  items: Item[] = [];

  constructor(private firestore: Firestore) {
  }

  async ngOnInit(): Promise<void> {
    const c = collection(this.firestore, 'blog_contents');
    const q = query(c, orderBy('update_date', 'desc'));
    const i = await getDocs(q);
    i.forEach(v => {
      this.items.push(v.data() as Item);
    });
  }
}
