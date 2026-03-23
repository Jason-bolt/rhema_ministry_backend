import db, { DB } from "../../../../config/db";
import { contactFormTable } from "../../../../config/db/schemas/ContactForm";
import { GenericHelper } from "../../../../utils/helpers/generic.helpers";
import logger from "../../../../utils/logger";
import IService from "./Iservice";

class GeneralService implements IService {
  constructor(private readonly db: DB) {}

  async sendContactEmail(
    senderName: string,
    senderEmail: string,
    subject: string,
    message: string,
  ) {
    try {
      const contactForm = await this.db
        .insert(contactFormTable)
        .values({
          id: GenericHelper.generateUUID(),
          name: senderName,
          email: senderEmail,
          subject,
          message,
        })
        .returning();

      logger.info(`Contact form message: ${JSON.stringify(contactForm)}`);

      return;
    } catch (error) {
      throw new Error("Failed to store contact info");
    }
  }

  async read(id: string) {
    try {
      return;
    } catch (error) {
      throw new Error("Failed to read base");
    }
  }

  async update(id: string, data: any) {
    try {
      return;
    } catch (error) {
      throw new Error("Failed to update base");
    }
  }

  async delete(id: string) {
    try {
      return;
    } catch (error) {
      throw new Error("Failed to delete base");
    }
  }
}

const generalService = new GeneralService(db);
export default generalService;
