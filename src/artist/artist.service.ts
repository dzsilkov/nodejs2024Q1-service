import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from '@shared/services';
import { Artist } from '@models';
import { createArtist } from '@helpers/helpers';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = createArtist(createArtistDto);
    this.dbService.artists.add(artist.id, artist);
    return artist;
  }

  findAll() {
    const artists = this.dbService.artists.findAll();
    return artists;
  }

  findOne(id: string) {
    const artist = this.dbService.artists.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return artist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = this.dbService.artists.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    const updatedArtist = {
      ...artist,
      name: name ? name : artist.name,
      grammy: grammy !== undefined ? grammy : artist.grammy,
    };
    this.dbService.artists.add(id, updatedArtist);
    return updatedArtist;
  }

  remove(id: string) {
    const artist = this.dbService.artists.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    this.dbService.artists.delete(id);
    return `Artist with ${id} removed`;
  }
}
