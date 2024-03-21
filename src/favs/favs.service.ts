import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsEntity } from '@favs/entities/favs.entity';
import { ArtistService } from '@artist/artist.service';
import { AlbumService } from '@album/album.service';
import { TrackService } from '@track/track.service';
import { UserService } from '@user/user.service';
import { plainToInstance } from 'class-transformer';
import { FavoritesResponseDto } from '@favs/dto/favorites-response-dto';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsEntity)
    private favsRepository: Repository<FavsEntity>,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private userService: UserService,
  ) {}

  async getFavorites() {
    const userId = this.userService.getUserId();
    return await this.favsRepository.findOne({
      where: { userId },
    });
  }

  async findAll() {
    const userId = this.userService.getUserId();
    const favorites =
      (await this.favsRepository.findOne({
        where: { userId },
      })) ??
      (await this.favsRepository.save(
        this.favsRepository.create({
          userId,
          artists: [],
          albums: [],
          tracks: [],
        }),
      ));
    return plainToInstance<FavoritesResponseDto, FavsEntity>(
      FavoritesResponseDto,
      favorites,
    );
  }

  async addTrackToFavourites(id: string) {
    try {
      const track = await this.trackService.findOne(id);

      const favorites = await this.getFavorites();

      return await this.favsRepository.save({
        ...favorites,
        tracks: [...favorites.tracks, track],
      });
    } catch {
      throw new UnprocessableEntityException(
        `Track with id ${id} doesn't exist.`,
      );
    }
  }

  async addArtistToFavourites(id: string) {
    try {
      const artist = await this.artistService.findOne(id);

      const favorites = await this.getFavorites();

      return await this.favsRepository.save({
        ...favorites,
        artists: [...favorites.artists, artist],
      });
    } catch {
      throw new UnprocessableEntityException(
        `Artist with id ${id} doesn't exist.`,
      );
    }
  }

  async addAlbumToFavourites(id: string) {
    try {
      const album = await this.albumService.findOne(id);
      const favorites = await this.getFavorites();

      return await this.favsRepository.save({
        ...favorites,
        albums: [...favorites.albums, album],
      });
    } catch {
      throw new UnprocessableEntityException(
        `Album with id ${id} doesn't exist.`,
      );
    }
  }

  async removeTrackFromFavourites(id: string) {
    const favorites = await this.getFavorites();
    const track = favorites.tracks.find((entity) => entity.id === id);
    if (!track) {
      throw new NotFoundException(`Track was not found.`);
    }
    await this.favsRepository.save({
      ...favorites,
      tracks: favorites.tracks.filter((entity) => entity.id !== id),
    });
    return `Deleted successfully`;
  }

  async removeArtistFromFavourites(id: string) {
    const favorites = await this.getFavorites();
    const artist = favorites.artists.find((entity) => entity.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist was not found.`);
    }
    await this.favsRepository.save({
      ...favorites,
      artists: favorites.artists.filter((entity) => entity.id !== id),
    });
    return `Deleted successfully`;
  }

  async removeAlbumFromFavourites(id: string) {
    const favorites = await this.getFavorites();
    const album = favorites.albums.find((entity) => entity.id === id);
    if (!album) {
      throw new NotFoundException(`Album was not found.`);
    }
    await this.favsRepository.save({
      ...favorites,
      albums: favorites.albums.filter((entity) => entity.id !== id),
    });
    return `Deleted successfully`;
  }
}
