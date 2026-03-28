import { createClient } from "redis";
import envs from "../../../config/envs";
import logger from "../../logger";

const redisClient = createClient({
  url: envs.REDIS_URL,
});

redisClient.on("error", (err) =>
  logger.warn(`Redis client error: ${err.message}`),
);

redisClient.connect().catch((err) =>
  logger.warn(`Redis connection failed: ${err.message}`),
);

const getRedisData = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    return JSON.parse(data as string);
  } catch (err: any) {
    logger.warn(`Redis get failed for key "${key}": ${err.message}`);
    return null;
  }
};

const setRedisData = async <T>(key: string, data: T, ttl: number = 10) => {
  try {
    await redisClient.set(key, JSON.stringify(data), { EX: ttl, NX: true });
  } catch (err: any) {
    logger.warn(`Redis set failed for key "${key}": ${err.message}`);
  }
};

const deleteRedisData = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (err: any) {
    logger.warn(`Redis delete failed for key "${key}": ${err.message}`);
  }
};

export { getRedisData, setRedisData, deleteRedisData };
