import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID_VERSION } from '@shared/constants';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

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
    createArtistDto: CreateArtistDto,
  ) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return artist;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const removeArtist = this.artistService.remove(id);
    if (!removeArtist) {
      throw new NotFoundException(`Artist with ID ${id} not found.`);
    }
    return `Artist with ${id} removed`;
  }
}
