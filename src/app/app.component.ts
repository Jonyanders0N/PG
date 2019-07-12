import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-music';

  tracks: any;
  videos: any = null;
  listaVideos: string[] = [];
  formSearch: FormGroup;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.formSearch = new FormGroup({
      artist: new FormControl(
        'pitty',
        Validators.required
      ),
      track: new FormControl(
        'equalize',
        Validators.required,
      ),
    });
  }

  loadTracks() {
    return this.dataService.getTrackSimilar(this.formSearch.value.artist, this.formSearch.value.track).subscribe(data => {

      console.log(data);
      if (data !== undefined) {
        this.tracks = data;
        console.log(this.tracks.similartracks.track);
        this.loadVideos(this.tracks.similartracks.track);
        // this.loadVideos(this.tracks.similartracks.track[0].artist.name, this.tracks.similartracks.track[0].name);
      }
    }, error => {
      console.log(error);
    });
  }

  loadVideos(listaTracks: any[]) {
    listaTracks.forEach(element => {
      this.dataService.getVideoSimilar(element.artist.name, element.name).subscribe(data => {
        this.videos = data;
        this.listaVideos.push(this.videos.items[0].id.videoId);
        console.log('https://www.youtube.com/watch?v=' + this.videos.items[0].id.videoId);
      }, error => {
        console.log(element.artist.name + element.name + 'Não encontrado');
      });
    });
    console.log(this.listaVideos);
  }
}
