import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrackModel } from './model';

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
  trackModel: TrackModel[] = [];
  qtdTracks = [5, 10, 20, 50];
  qtdDefault = 5;

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
      qtdTracks: new FormControl(

      )
    });
    this.formSearch.controls['qtdTracks'].setValue(this.qtdDefault, {onlySelf: true});
  }

  loadTracks() {
    this.trackModel = [];
    return this.dataService.getTrackSimilar(this.formSearch.value.artist,
                                            this.formSearch.value.track,
                                            this.formSearch.value.qtdTracks).subscribe(data => {

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
      const track = new TrackModel();
      this.dataService.getVideoSimilar(element.artist.name, element.name).subscribe(data => {

        console.log(data);
        this.videos = data;
        this.listaVideos.push(this.videos.items[0].id.videoId);
        console.log('https://www.youtube.com/watch?v=' + this.videos.items[0].id.videoId);

        track.nameSong = element.artist.name;
        track.nameArtist = element.name;
        track.linkYoutube = 'https://www.youtube.com/watch?v=' + this.videos.items[0].id.videoId;

        this.trackModel.push(track);
      }, error => {
        console.log(element.artist.name + element.name + 'Não encontrado');
      });
    });
    console.log(this.listaVideos);
  }
}
