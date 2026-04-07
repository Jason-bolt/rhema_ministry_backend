import { count, eq } from "drizzle-orm";
import db, { DB } from "../../../../config/db";
import { eventsTable } from "../../../../config/db/schemas/Event";
import { camelize } from "../../../../utils/helpers/general";
import logger from "../../../../utils/logger";
import { ICreateEvent } from "../types";
import { v4 as uuidv4 } from "uuid";

class EventService {
  constructor(private readonly db: DB) {}

  async create(data: ICreateEvent) {
    try {
      const event = await this.db
        .insert(eventsTable)
        .values({
          id: uuidv4(),
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,
          description: data.description,
          recurring: data.recurring,
          flier_url: data.flierUrl ?? "",
        })
        .returning();

      logger.info(`Event created: ${JSON.stringify(event[0])}`);
      return camelize(event[0]);
    } catch (error) {
      throw new Error("Failed to create event");
    }
  }

  async getCount() {
    try {
      const result = await db.select({ value: count() }).from(eventsTable);
      return result[0];
    } catch (error) {
      throw new Error("Failed to get events count");
    }
  }

  async getEvents() {
    try {
      const events = await db.select().from(eventsTable);
      return camelize(events);
    } catch (error) {
      throw new Error("Failed to get events");
    }
  }

  async update(id: string, data: any) {
    try {
      const event = await this.db
        .update(eventsTable)
        .set({
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,
          description: data.description,
          recurring: data.recurring,
          flier_url: data.flierUrl ?? "",
        })
        .where(eq(eventsTable.id, id))
        .returning();

      logger.info(`Event updated: ${JSON.stringify(event[0])}`);
      return camelize(event[0]);
    } catch (error) {
      throw new Error("Failed to update event");
    }
  }

  async delete(id: string) {
    try {
      await db.delete(eventsTable).where(eq(eventsTable.id, id));
    } catch (error) {
      throw new Error("Failed to delete event");
    }
  }
}

const eventService = new EventService(db);
export default eventService;
