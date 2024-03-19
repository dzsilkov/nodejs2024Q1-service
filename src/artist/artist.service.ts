import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const createArtist: ArtistEntity =
      this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(createArtist);
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return artist;
  }

  async update(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return await this.artistRepository.save({
      ...artist,
      name: name ? name : artist.name,
      grammy: grammy !== undefined ? grammy : artist.grammy,
    });
  }

  async remove(id: string) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return `Artist with ${id} removed`;
  }
}
