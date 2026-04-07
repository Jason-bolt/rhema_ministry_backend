import db from "../../../../config/db";
import { siteTextsTable, SITE_TEXTS_ID } from "../../../../config/db/schemas/SiteText";
import { camelize } from "../../../../utils/helpers/general";
import { ISiteTexts } from "../types";

const DEFAULT_TEXTS: ISiteTexts = {
  heroWelcome: "Welcome to",
  heroTitle: "Eternal Rhema Ministries",
  heroSubtitle:
    "Eternal Rhema Ministries (ERM) is a global Christian organization dedicated to the total transformation of the individual and society.",
  missionTitle: "Our Mission",
  missionText: "Developing disciples of Christ-like excellence through the Word.",
  aboutPreviewTitle: "A Ministry Built on the Word",
  aboutPreviewText:
    "Eternal Rhema Ministries was established with a burning passion to declare the undiluted word of God.",
  ctaTitle: "Join Us This Sunday",
  ctaText: "Experience the power of God's word and the warmth of genuine fellowship. Everyone is welcome.",
};

class SiteTextService {
  async getSiteTexts(): Promise<ISiteTexts> {
    try {
      const rows = await db.select().from(siteTextsTable).limit(1);
      if (!rows[0]) return DEFAULT_TEXTS;
      const { id, ...rest } = camelize(rows[0]) as any;
      return rest as ISiteTexts;
    } catch (error) {
      throw new Error("Failed to get site texts");
    }
  }

  async updateSiteTexts(data: ISiteTexts): Promise<ISiteTexts> {
    try {
      const rows = await db
        .insert(siteTextsTable)
        .values({
          id: SITE_TEXTS_ID,
          hero_welcome: data.heroWelcome,
          hero_title: data.heroTitle,
          hero_subtitle: data.heroSubtitle,
          mission_title: data.missionTitle,
          mission_text: data.missionText,
          about_preview_title: data.aboutPreviewTitle,
          about_preview_text: data.aboutPreviewText,
          cta_title: data.ctaTitle,
          cta_text: data.ctaText,
        })
        .onConflictDoUpdate({
          target: siteTextsTable.id,
          set: {
            hero_welcome: data.heroWelcome,
            hero_title: data.heroTitle,
            hero_subtitle: data.heroSubtitle,
            mission_title: data.missionTitle,
            mission_text: data.missionText,
            about_preview_title: data.aboutPreviewTitle,
            about_preview_text: data.aboutPreviewText,
            cta_title: data.ctaTitle,
            cta_text: data.ctaText,
          },
        })
        .returning();

      const { id, ...rest } = camelize(rows[0]) as any;
      return rest as ISiteTexts;
    } catch (error) {
      throw new Error("Failed to update site texts");
    }
  }
}

const siteTextService = new SiteTextService();
export default siteTextService;
