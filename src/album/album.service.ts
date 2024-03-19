import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '@album/entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const createAlbum: AlbumEntity =
      this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(createAlbum);
  }

  findAll() {
    const albums = this.albumRepository.find();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return album;
  }

  async update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return await this.albumRepository.save({
      ...album,
      name: name ? name : album.name,
      year: year ? year : album.year,
      artistId: artistId !== undefined ? artistId : album.artistId,
    });
  }

  async remove(id: string) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return `Album with ${id} removed`;
  }

  // subscribeArtistRemoved() {
  //   this.dbService.artists.entityRemoved.subscribe((id) => {
  //     this.dbService.albums.forEach((track) => {
  //       if (track.artistId === id) {
  //         this.dbService.albums.add(track.id, { ...track, artistId: null });
  //       }
  //     });
  //   });
  // }
}
