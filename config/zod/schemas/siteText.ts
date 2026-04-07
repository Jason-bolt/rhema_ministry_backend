import { z } from "zod";

export const updateSiteTextsSchema = z.object({
  heroWelcome: z.string(),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  missionTitle: z.string(),
  missionText: z.string(),
  aboutPreviewTitle: z.string(),
  aboutPreviewText: z.string(),
  ctaTitle: z.string(),
  ctaText: z.string(),
});
