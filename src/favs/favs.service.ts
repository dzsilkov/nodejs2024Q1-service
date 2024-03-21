import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-response-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from '@album/entities/album.entity';
import { TrackEntity } from '@track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(
    // @InjectRepository(AlbumEntity)
    // @InjectRepository(ArtistEntity)
    // @InjectRepository(TrackEntity)
    // private albumRepository: Repository<AlbumEntity>,
    // private artistRepository: Repository<ArtistEntity>,
    // private trackRepository: Repository<TrackEntity>,
  ) {}

  findAll() {
    // return {
    // artists: this.dbService.artists.getFavorites(),
    // albums: this.dbService.albums.getFavorites(),
    // tracks: this.dbService.tracks.getFavorites(),
    // };
  }

  addTrackToFavourites(id: string) {
    // const track = this.dbService.tracks.findOne(id);
    // if (!track) {
    //   throw new UnprocessableEntityException(
    //     `Track with id ${id} doesn't exist`,
    //   );
    // }
    //
    // this.dbService.tracks.addToFavorites(id);
    // return track;
  }

  addArtistToFavourites(id: string) {
    // const artist = this.dbService.artists.findOne(id);
    //
    // if (!artist) {
    //   throw new UnprocessableEntityException(
    //     `Artist with id ${id} doesn't exist`,
    //   );
    // }
    //
    // this.dbService.artists.addToFavorites(id);
    // return artist;
  }

  addAlbumToFavourites(id: string) {
    // const album = this.dbService.albums.findOne(id);
    //
    // if (!album) {
    //   throw new UnprocessableEntityException(
    //     `Album with id ${id} doesn't exist.`,
    //   );
    // }
    //
    // this.dbService.albums.addToFavorites(id);
    // return album;
  }

  removeTrackFromFavourites(id: string) {
    // const track = this.dbService.tracks.findOne(id);
    //
    // if (!track) {
    //   throw new NotFoundException(`Track was not found.`);
    // }
    //
    // this.dbService.tracks.removeFromFavorites(id);
    // return `Deleted successfully`;
  }

  removeArtistFromFavourites(id: string) {
    // const artist = this.dbService.artists.findOne(id);
    //
    // if (!artist) {
    //   throw new NotFoundException(`Artist was not found.`);
    // }
    //
    // this.dbService.artists.removeFromFavorites(id);
    // return `Deleted successfully`;
  }

  removeAlbumFromFavourites(id: string) {
    // const album = this.dbService.albums.findOne(id);
    //
    // if (!album) {
    //   throw new NotFoundException(`Album was not found.`);
    // }
    //
    // this.dbService.albums.removeFromFavorites(id);
    // return `Deleted successfully`;
  }
}
