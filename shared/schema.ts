import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  stage: text("stage").notNull(),
  day: text("day").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  duration: integer("duration").notNull(),
});

export const userSelections = pgTable("user_selections", {
  id: serial("id").primaryKey(),
  artistId: integer("artist_id").notNull(),
  selected: boolean("selected").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertArtistSchema = createInsertSchema(artists).omit({
  id: true,
});

export const insertUserSelectionSchema = createInsertSchema(userSelections).omit({
  id: true,
  createdAt: true,
});

export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Artist = typeof artists.$inferSelect;
export type InsertUserSelection = z.infer<typeof insertUserSelectionSchema>;
export type UserSelection = typeof userSelections.$inferSelect;
