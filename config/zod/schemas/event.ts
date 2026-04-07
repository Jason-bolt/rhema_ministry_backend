import { z } from "zod";

const eventSchema = {
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  recurring: z.boolean(),
  flierUrl: z.string().optional(),
};

export const createEventSchema = z.object(eventSchema);

export const updateEventSchema = z.object({
  id: z.string().min(1, "Id is required"),
  ...eventSchema,
});
