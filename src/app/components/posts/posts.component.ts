import {Component, OnInit} from '@angular/core';
import {
  Firestore,
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
} from '@angular/fire/firestore';
import {Analytics, logEvent} from '@angular/fire/analytics';

export interface Item {
 id: string;
 title: string;
 description: string;
 ogp_image: string;
 content: string;
 tag: string;
 content_url: string;
 markdown_url: string;
 update_date: Timestamp;
 created_date: Timestamp;
 publish: boolean;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  items: Item[] = [];

  constructor(private firestore: Firestore, private a: Analytics) {
    // logEvent(a, 'posts');
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
