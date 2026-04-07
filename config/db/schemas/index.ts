import { contactFormTable } from "./ContactForm";
import { eventsTable } from "./Event";
import { galleryGroupsTable } from "./Gallery";
import { resetPasswordTokensTable } from "./PasswordReset";
import { sermonsTable } from "./Sermon";
import { siteTextsTable } from "./SiteText";
import { usersTable } from "./User";

const schemas = {
  users: usersTable,
  sermons: sermonsTable,
  events: eventsTable,
  galleryGroups: galleryGroupsTable,
  siteTexts: siteTextsTable,
  contactForm: contactFormTable,
  resetPasswordTokens: resetPasswordTokensTable,
};

export default schemas;
