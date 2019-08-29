import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  lastFmApiiUrl = 'http://ws.audioscrobbler.com/2.0/?';
  youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search?';
  lastFMKey = 'lastfm_key';
  youtubeKey = 'youtube_key';

  constructor(private http: HttpClient) { }

  getTrackSimilar(artist: string, track: string, amount: number) {
    return this.http.get(
      // tslint:disable-next-line:max-line-length
      this.lastFmApiiUrl + `method=track.getSimilar&api_key=${this.lastFMKey}&artist=${artist}&track=${track}&limit=${amount}&format=json`);
  }

  getVideoSimilar(artist: string, track: string) {
    return this.http.get(
      this.youtubeApiUrl + `part=id&q=${artist}/${track}&type=video&maxResults=1&key=${this.youtubeKey}`
    );
  }
}
