import { Injectable } from '@nestjs/common';
import { Db } from '../../../db/db.';
import { Album, Artist, Track, User } from '@models';

@Injectable()
export class DbService {
  private pUsers = new Db<User>();
  private pAlbums = new Db<Album>();
  private pArtists = new Db<Artist>();
  private pTracks = new Db<Track>();

  private static instance?: DbService;

  constructor() {
    if (!DbService.instance) {
      DbService.instance = this;
    }
    return DbService.instance;
  }

  get users(): Db<User> {
    return this.pUsers;
  }

  get albums(): Db<Album> {
    return this.pAlbums;
  }

  get tracks(): Db<Track> {
    return this.pTracks;
  }

  get artists(): Db<Artist> {
    return this.pArtists;
  }
}
