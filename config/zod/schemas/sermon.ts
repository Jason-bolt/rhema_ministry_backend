import { z } from "zod";

const sermonSchema = {
  title: z.string().min(1, "Title is required"),
  speaker: z.string().min(1, "Speaker is required"),
  date: z.string().min(1, "Date is required"),
  duration: z.string().min(1, "Duration is required"),
  resourceType: z.enum(["video", "audio", "article"]),
  resourceUrl: z.string().min(1, "Resource url is required"),
  addedBy: z.string().min(1, "Admin id is required"),
};

export const createSermonSchema = z.object(sermonSchema);

export const updateSermonSchema = z.object({
  id: z.string().min(1, "Id is required"),
  ...sermonSchema,
});
