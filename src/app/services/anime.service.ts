import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/Environment/EnvironmentalVariables';
import { AnimeList } from '../Models/AnimeList';
import { AnimeGenres } from '../Models/AnimeGenres';
import { AnimeRanking } from '../Models/AnimeRanking';
import { FilteredAnime } from '../Models/FilteredAnime';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  errorSignal = signal('');
  genreType = signal('');
  rank: number = 1;
  id: number = 1;

  constructor(private http: HttpClient) {}

  getAnimeList(filteredAnimeList: FilteredAnime): Observable<AnimeList> {
    //setting headers fr api
    let headers = new HttpHeaders()
      .set(Environment.rapidApiHostName, Environment.rapidApiHostValue)
      .set(Environment.rapidApiKeyName, Environment.rapidApiKeyValue);

    //setting params
    let params = new HttpParams()
      .set('page', filteredAnimeList.page)
      .set('size', filteredAnimeList.size)
      .set('search', filteredAnimeList.search)
      .set('genres', filteredAnimeList.genres)
      .set('sortBy', filteredAnimeList.sortBy)
      .set('sortOrder', filteredAnimeList.sortOrder)
      .set('types', filteredAnimeList.types);
    console.log('filter:---', filteredAnimeList);
    //http get method
    return this.http.get<AnimeList>(Environment.getAllAnimesUrl, {
      headers,
      params,
    });
  }

  getGenresList(): Observable<AnimeGenres> {
    let headers = new HttpHeaders()
      .set(Environment.rapidApiHostName, Environment.rapidApiHostValue)
      .set(Environment.rapidApiKeyName, Environment.rapidApiKeyValue);

    return this.http.get<AnimeGenres>(Environment.getGenresUrl, { headers });
  }

  getAnimeByRanking(rank: number): Observable<AnimeRanking> {
    let headers = new HttpHeaders()
      .set(Environment.rapidApiHostName, Environment.rapidApiHostValue)
      .set(Environment.rapidApiKeyName, Environment.rapidApiKeyValue);

    // let param = new HttpParams().set('rank', this.params.rank);

    return this.http.get<AnimeRanking>(
      Environment.getAnimeByRankingUrl + rank,
      {
        headers,
      }
    );
  }

  getAnimeById(id: number): Observable<AnimeRanking> {
    let headers = new HttpHeaders()
      .set(Environment.rapidApiHostName, Environment.rapidApiHostValue)
      .set(Environment.rapidApiKeyName, Environment.rapidApiKeyValue);

    // let param = new HttpParams().set('rank', this.params.rank);

    return this.http.get<AnimeRanking>(Environment.getAnimeByIdUrl + id, {
      headers,
    });
  }

  //component

  getGenres() {
    this.getGenresList().subscribe({
      next: (response: AnimeGenres) => {
        console.log('All Genres List:-', response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getRanking() {
    this.getAnimeByRanking(this.rank).subscribe({
      next: (res: AnimeRanking) => {
        console.log('Anime by Ranking:-', res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getById() {
    this.getAnimeById(this.id).subscribe({
      next: (res: AnimeRanking) => {
        console.log('Anime by Id:-', res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
