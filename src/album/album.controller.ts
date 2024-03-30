import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUID_VERSION } from '@shared/constants';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(
    @Body(
      new ValidationPipe({
        exceptionFactory: () =>
          new BadRequestException(
            'Bad request. Body does not contain required fields',
          ),
      }),
    )
    createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const removeAlbum = this.albumService.remove(id);
    if (!removeAlbum) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }
    return `Album with ${id} removed`;
  }
}
