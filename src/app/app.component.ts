import { Component, OnInit, signal } from '@angular/core';
import { AnimeService } from './services/anime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AniStore';

  constructor(private service: AnimeService) {}
  ngOnInit() {}
}
