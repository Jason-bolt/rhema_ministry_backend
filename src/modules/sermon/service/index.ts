import { count, eq } from "drizzle-orm";
import db, { DB } from "../../../../config/db";
import { sermonsTable } from "../../../../config/db/schemas/Sermon";
import { camelize } from "../../../../utils/helpers/general";
import logger from "../../../../utils/logger";
import { ICreateSermon } from "../types";
import IService from "./Iservice";
import { v4 as uuidv4 } from "uuid";

class SermonService implements IService {
  constructor(private readonly db: DB) {}

  async create(data: ICreateSermon) {
    try {
      const sermon = await this.db
        .insert(sermonsTable)
        .values({
          id: uuidv4(),
          title: data.title,
          speaker: data.speaker,
          date: data.date,
          duration: data.duration,
          resource_type: data.resourceType,
          resource_url: data.resourceUrl,
          added_by: data.addedBy,
        })
        .returning();

      logger.info(`Sermon: ${JSON.stringify(sermon)}`);

      return camelize(sermon[0]);
    } catch (error) {
      throw new Error("Failed to create sermon");
    }
  }

  async getSermonsCount() {
    try {
      const sermonsCount = await db
        .select({ value: count() })
        .from(sermonsTable);

      return sermonsCount[0];
    } catch (error) {
      throw new Error("Failed to get sermons count");
    }
  }

  async getSermons() {
    try {
      const sermons = await db.select().from(sermonsTable);

      return camelize(sermons);
    } catch (error) {
      throw new Error("Failed to get sermons count");
    }
  }

  async read(id: string) {
    try {
      return;
    } catch (error) {
      throw new Error("Failed to read sermon");
    }
  }

  async update(id: string, data: any) {
    try {
      const sermon = await this.db
        .update(sermonsTable)
        .set({
          title: data.title,
          speaker: data.speaker,
          date: data.date,
          duration: data.duration,
          resource_type: data.resourceType,
          resource_url: data.resourceUrl,
          added_by: data.addedBy,
        })
        .where(eq(sermonsTable.id, id))
        .returning();

      logger.info(`Sermon: ${JSON.stringify(sermon)}`);

      return camelize(sermon[0]);
    } catch (error) {
      throw new Error("Failed to update sermon");
    }
  }

  async delete(id: string) {
    try {
      await db.delete(sermonsTable).where(eq(sermonsTable.id, id));
      return;
    } catch (error) {
      throw new Error("Failed to delete sermon");
    }
  }
}

const sermonService = new SermonService(db);
export default sermonService;
