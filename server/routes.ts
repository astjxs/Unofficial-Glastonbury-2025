import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArtistSchema, insertUserSelectionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all artists
  app.get("/api/artists", async (req, res) => {
    try {
      const artists = await storage.getAllArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  // Create artist
  app.post("/api/artists", async (req, res) => {
    try {
      const validatedData = insertArtistSchema.parse(req.body);
      const artist = await storage.createArtist(validatedData);
      res.status(201).json(artist);
    } catch (error) {
      res.status(400).json({ message: "Invalid artist data" });
    }
  });

  // Get user selections
  app.get("/api/selections", async (req, res) => {
    try {
      const selections = await storage.getUserSelections();
      res.json(selections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch selections" });
    }
  });

  // Create user selection
  app.post("/api/selections", async (req, res) => {
    try {
      const validatedData = insertUserSelectionSchema.parse(req.body);
      const selection = await storage.createUserSelection(validatedData);
      res.status(201).json(selection);
    } catch (error) {
      res.status(400).json({ message: "Invalid selection data" });
    }
  });

  // Delete user selection
  app.delete("/api/selections/:artistId", async (req, res) => {
    try {
      const artistId = parseInt(req.params.artistId);
      if (isNaN(artistId)) {
        return res.status(400).json({ message: "Invalid artist ID" });
      }
      await storage.deleteUserSelection(artistId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete selection" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
