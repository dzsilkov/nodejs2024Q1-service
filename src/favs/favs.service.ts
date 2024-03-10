import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from '@core/services/db.service';
import { FavoritesResponseDto } from './dto/favorites-response-dto';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  findAll(): FavoritesResponseDto {
    return {
      artists: this.dbService.artists.getFavorites(),
      albums: this.dbService.albums.getFavorites(),
      tracks: this.dbService.tracks.getFavorites(),
    };
  }

  addTrackToFavourites(id: string) {
    const track = this.dbService.tracks.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException(`Track with ID ${id} not found.`);
    }

    this.dbService.tracks.addToFavorites(id);
    return track;
  }

  addArtistToFavourites(id: string) {
    const artist = this.dbService.artists.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException(`Artist with ID ${id} not found.`);
    }

    this.dbService.artists.addToFavorites(id);
    return artist;
  }

  addAlbumToFavourites(id: string) {
    const album = this.dbService.albums.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException(`Album with ID ${id} not found.`);
    }

    this.dbService.albums.addToFavorites(id);
    return album;
  }

  removeTrackFromFavourites(id: string) {
    const track = this.dbService.tracks.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }

    this.dbService.tracks.removeFromFavorites(id);
    return `Track with ${id} removed from favorites`;
  }

  removeArtistFromFavourites(id: string) {
    const artist = this.dbService.artists.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }

    this.dbService.artists.removeFromFavorites(id);
    return `Artist with ${id} removed from favorites`;
  }

  removeAlbumFromFavourites(id: string) {
    const album = this.dbService.albums.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }

    this.dbService.albums.removeFromFavorites(id);
    return `Album with ${id} removed from favorites`;
  }
}
