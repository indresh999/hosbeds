import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from './../../services/feed.service';

@Component({
  selector: 'app-feed-update',
  templateUrl: './feed-update.component.html',
  styleUrls: ['./feed-update.component.scss']
})
export class FeedUpdateComponent implements OnInit {
  @Input() loginUser: any;
  public postData = {
    feed: '',
    feed_id: '',
    lastCreated: '',
    token: '',
    user_id: ''
  };
  constructor(private feedService: FeedService) {}

  ngOnInit() {}

}
