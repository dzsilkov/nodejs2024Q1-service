import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from '@track/entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const createTrack = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(createTrack);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }
    return track;
  }

  async update(
    id: string,
    { name, artistId, duration, albumId }: UpdateTrackDto,
  ) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }
    return await this.trackRepository.save({
      ...track,
      name: name ? name : track.name,
      artistId: artistId !== undefined ? artistId : track.artistId,
      albumId: albumId !== undefined ? albumId : track.albumId,
      duration: duration !== undefined ? duration : track.duration,
    });
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }
    return `Track with ${id} removed`;
  }
}
