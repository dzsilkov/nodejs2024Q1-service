import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from '@core/services/db.service';
import { Track } from '@models';
import { createTrack } from '../helpers/helpers';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {
    this.subscribeAlbumRemoved();
    this.subscribeArtistRemoved();
  }

  create(createTrackDto: CreateTrackDto) {
    const track: Track = createTrack(createTrackDto);
    this.dbService.tracks.add(track.id, track);
    return track;
  }

  findAll() {
    const tracks = this.dbService.tracks.findAll();
    return tracks;
  }

  findOne(id: string) {
    const track = this.dbService.tracks.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }
    return track;
  }

  update(id: string, { name, artistId, duration, albumId }: UpdateTrackDto) {
    const track = this.dbService.tracks.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }
    const updatedTrack = {
      ...track,
      name: name ? name : track.name,
      artistId: artistId !== undefined ? artistId : track.artistId,
      albumId: albumId !== undefined ? albumId : track.albumId,
      duration: duration !== undefined ? duration : track.duration,
    };
    this.dbService.tracks.add(id, updatedTrack);
    return updatedTrack;
  }

  remove(id: string) {
    const track = this.dbService.tracks.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }
    this.dbService.tracks.delete(id);
    return `Track with ${id} removed`;
  }

  subscribeAlbumRemoved() {
    this.dbService.albums.entityRemoved.subscribe((id) => {
      this.dbService.tracks.forEach((track) => {
        if (track.albumId === id) {
          this.dbService.tracks.add(track.id, { ...track, albumId: null });
        }
      });
    });
  }

  subscribeArtistRemoved() {
    this.dbService.artists.entityRemoved.subscribe((id) => {
      this.dbService.tracks.forEach((track) => {
        if (track.artistId === id) {
          this.dbService.tracks.add(track.id, { ...track, artistId: null });
        }
      });
    });
  }
}
