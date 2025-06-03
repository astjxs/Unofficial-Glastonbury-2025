import { artists, userSelections, type Artist, type InsertArtist, type UserSelection, type InsertUserSelection } from "@shared/schema";

export interface IStorage {
  // Artists
  getAllArtists(): Promise<Artist[]>;
  getArtistById(id: number): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  
  // User Selections
  getUserSelections(): Promise<UserSelection[]>;
  createUserSelection(selection: InsertUserSelection): Promise<UserSelection>;
  deleteUserSelection(artistId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private artists: Map<number, Artist>;
  private userSelections: Map<number, UserSelection>;
  private currentArtistId: number;
  private currentSelectionId: number;

  constructor() {
    this.artists = new Map();
    this.userSelections = new Map();
    this.currentArtistId = 1;
    this.currentSelectionId = 1;
  }

  async getAllArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async getArtistById(id: number): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = this.currentArtistId++;
    const artist: Artist = { ...insertArtist, id };
    this.artists.set(id, artist);
    return artist;
  }

  async getUserSelections(): Promise<UserSelection[]> {
    return Array.from(this.userSelections.values());
  }

  async createUserSelection(insertSelection: InsertUserSelection): Promise<UserSelection> {
    const id = this.currentSelectionId++;
    const selection: UserSelection = { 
      ...insertSelection, 
      id, 
      createdAt: new Date() 
    };
    this.userSelections.set(id, selection);
    return selection;
  }

  async deleteUserSelection(artistId: number): Promise<void> {
    for (const [id, selection] of this.userSelections.entries()) {
      if (selection.artistId === artistId) {
        this.userSelections.delete(id);
        break;
      }
    }
  }
}

export const storage = new MemStorage();
