import { z } from "zod";

const galleryGroupSchema = {
  name: z.string().min(1, "Album name is required"),
  coverUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
};

export const createGalleryGroupSchema = z.object(galleryGroupSchema);

export const updateGalleryGroupSchema = z.object({
  id: z.string().min(1, "Id is required"),
  ...galleryGroupSchema,
});
