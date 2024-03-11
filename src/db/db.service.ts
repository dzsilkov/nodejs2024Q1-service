import { Injectable } from '@nestjs/common';
import { Album, Artist, Track, User } from '@models';
import { EntityMap } from '@db/entity-map.';

@Injectable()
export class DbService {
  private pUsers = new EntityMap<User>();
  private pAlbums = new EntityMap<Album>();
  private pArtists = new EntityMap<Artist>();
  private pTracks = new EntityMap<Track>();

  get users(): EntityMap<User> {
    return this.pUsers;
  }

  get albums(): EntityMap<Album> {
    return this.pAlbums;
  }

  get tracks(): EntityMap<Track> {
    return this.pTracks;
  }

  get artists(): EntityMap<Artist> {
    return this.pArtists;
  }
}
