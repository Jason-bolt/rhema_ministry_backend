import { count, eq } from "drizzle-orm";
import db, { DB } from "../../../../config/db";
import { galleryGroupsTable } from "../../../../config/db/schemas/Gallery";
import { camelize } from "../../../../utils/helpers/general";
import logger from "../../../../utils/logger";
import { ICreateGalleryGroup } from "../types";
import { v4 as uuidv4 } from "uuid";

class GalleryService {
  constructor(private readonly db: DB) {}

  async create(data: ICreateGalleryGroup) {
    try {
      const coverUrl = data.coverUrl || data.images[0] || "";
      const group = await this.db
        .insert(galleryGroupsTable)
        .values({
          id: uuidv4(),
          name: data.name,
          cover_url: coverUrl,
          images: data.images,
        })
        .returning();

      logger.info(`Gallery group created: ${JSON.stringify(group[0])}`);
      return camelize(group[0]);
    } catch (error) {
      throw new Error("Failed to create gallery group");
    }
  }

  async getCount() {
    try {
      const result = await db.select({ value: count() }).from(galleryGroupsTable);
      return result[0];
    } catch (error) {
      throw new Error("Failed to get gallery count");
    }
  }

  async getGallery() {
    try {
      const groups = await db.select().from(galleryGroupsTable);
      return camelize(groups);
    } catch (error) {
      throw new Error("Failed to get gallery");
    }
  }

  async update(id: string, data: any) {
    try {
      const coverUrl = data.coverUrl || data.images?.[0] || "";
      const group = await this.db
        .update(galleryGroupsTable)
        .set({
          name: data.name,
          cover_url: coverUrl,
          images: data.images ?? [],
        })
        .where(eq(galleryGroupsTable.id, id))
        .returning();

      logger.info(`Gallery group updated: ${JSON.stringify(group[0])}`);
      return camelize(group[0]);
    } catch (error) {
      throw new Error("Failed to update gallery group");
    }
  }

  async delete(id: string) {
    try {
      await db.delete(galleryGroupsTable).where(eq(galleryGroupsTable.id, id));
    } catch (error) {
      throw new Error("Failed to delete gallery group");
    }
  }
}

const galleryService = new GalleryService(db);
export default galleryService;
