import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from '@core/services/db.service';
import { Album } from '@models';
import { createAlbum } from '../helpers/helpers';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {
    this.subscribeArtistRemoved();
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = createAlbum(createAlbumDto);
    this.dbService.albums.add(album.id, album);
    return album;
  }

  findAll() {
    const albums = this.dbService.albums.findAll();
    return albums;
  }

  findOne(id: string) {
    const album = this.dbService.albums.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return album;
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = this.dbService.albums.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    const updatedAlbum = {
      ...album,
      name: name ? name : album.name,
      year: year ? year : album.year,
      artistId: artistId !== undefined ? artistId : album.artistId,
    };
    this.dbService.albums.add(id, updatedAlbum);
    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.dbService.albums.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    this.dbService.albums.delete(id);
    return `Album with ${id} removed`;
  }

  subscribeArtistRemoved() {
    this.dbService.artists.entityRemoved.subscribe((id) => {
      this.dbService.albums.forEach((track) => {
        if (track.artistId === id) {
          this.dbService.albums.add(track.id, { ...track, artistId: null });
        }
      });
    });
  }
}
