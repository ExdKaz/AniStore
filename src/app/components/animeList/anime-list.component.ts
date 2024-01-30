import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimeList } from 'src/app/Models/AnimeList';
import { FilteredAnime } from 'src/app/Models/FilteredAnime';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  constructor(
    private service: AnimeService,
    private formBuilder: FormBuilder
  ) {}
  animeList: any;
  isHidden: boolean = true;
  currentPage: number = 1;
  hideButton: boolean = true;
  genreType = signal('');
  errorMessage = signal('');
  filteredList = new FilteredAnime();
  list = new FilteredAnime();

  ngOnInit() {
    this.getAnime(this.filteredList);
    console.log('bbb', this.filteredList);
  }

  animeOptions = this.formBuilder.group({
    page: ['1', [Validators.max(2609)]],
    size: ['10', [Validators.max(10)]],
    search: [''],
    genres: [''],
    sortBy: [''],
    sortOrder: [''],
    types: [''],
  });

  onSubmit() {
    if (this.animeOptions.valid) {
      this.filteredList.page = this.animeOptions.value.page;
      this.filteredList.size = this.animeOptions.value.size;
      this.filteredList.search = this.animeOptions.value.search;
      this.filteredList.genres = this.animeOptions.value.genres;
      this.filteredList.sortBy = this.animeOptions.value.sortBy;
      this.filteredList.sortOrder = this.animeOptions.value.sortOrder;
      this.filteredList.types = this.animeOptions.value.types;
      console.log(this.filteredList);
      this.service.getAnimeList(this.filteredList).subscribe({
        next: (res: any) => {
          this.animeList = res.data;
          console.log('All Anime List:-', this.animeList);
        },
        error: (err: any) => {
          this.isHidden = false;
          this.service.errorSignal.set(err.error.message);
          this.errorMessage = err.error.message;
        },
      });
    } else {
      alert('Invalid form: Page and Size are Required');
    }
  }
  getAnime(filteredList: FilteredAnime) {
    this.service.getAnimeList(filteredList).subscribe({
      next: (res: any) => {
        this.animeList = res.data;
        console.log('All Anime List:-', this.animeList);
      },
      error: (err: any) => {
        this.isHidden = false;
        this.service.errorSignal.set(err.error.message);
        this.errorMessage = err.error.message;
      },
    });
  }

  loadPreviousPage() {
    if (this.currentPage === 2) {
      this.currentPage--;
      this.hideButton = true;
      this.filteredList.page = this.currentPage.toString();
      this.getAnime(this.filteredList);
    } else {
      this.hideButton = false;
      this.currentPage--;
      console.log(`prevpage${this.currentPage}`);
      this.filteredList.page = this.currentPage.toString();
      this.getAnime(this.filteredList);
    }
  }

  loadNextPage() {
    this.currentPage++;
    console.log(`nextpage${this.currentPage}`);
    this.filteredList.page = this.currentPage.toString();
    this.getAnime(this.filteredList);
    if (this.currentPage >= 2) {
      this.hideButton = false;
    }
  }

  clearFilteredAnime() {
    this.currentPage = 1;
    this.hideButton = true;
    this.getAnime(this.list);
  }
}
