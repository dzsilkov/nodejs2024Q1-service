import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';
import { hash } from 'bcryptjs';
import { Album, Artist, Track, User } from '@models';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { CreateArtistDto } from '@artist/dto/create-artist.dto';
import { CreateTrackDto } from '@track/dto/create-track.dto';
import { CreateAlbumDto } from '@album/dto/create-album.dto';
import { HASH_SALT_OF_ROUNDS } from '@shared/constants';

export const uuidIsValid = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

// export const createUser = async ({
//   login,
//   password,
// }: CreateUserDto): Promise<User> => {
//   const hashPassword = await hash(password, HASH_SALT_OF_ROUNDS);
//   const date = new Date().getTime();
//   return {
//     id: uuidv4(),
//     login,
//     password: hashPassword,
//     version: 1,
//     createdAt: date,
//     updatedAt: date,
//   };
// };

export const createArtist = ({ name, grammy }: CreateArtistDto): Artist => {
  return {
    id: uuidv4(),
    name,
    grammy,
  };
};

export const createTrack = (createTrackDto: CreateTrackDto): Track => {
  return {
    ...createTrackDto,
    id: uuidv4(),
  };
};

export const createAlbum = (createAlbumDto: CreateAlbumDto): Album => {
  return {
    ...createAlbumDto,
    id: uuidv4(),
  };
};