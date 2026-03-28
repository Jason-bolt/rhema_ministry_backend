import { Queue } from "bullmq";
import "dotenv/config";
import Redis from "ioredis";
import logger from "../../utils/logger";
import envs from "../envs";

const connection = new Redis(envs.REDIS_URL, { maxRetriesPerRequest: null });

export const AppQueue = new Queue("app-queue", { connection });

export interface EmailJob {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (emailData: EmailJob) => {
  await AppQueue.add("sendEmail", emailData, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });

  logger.info(`Email job added: ${JSON.stringify(emailData)}`);
};
