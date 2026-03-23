import { contactFormTable } from "./ContactForm";
import { resetPasswordTokensTable } from "./PasswordReset";
import { sermonsTable } from "./Sermon";
import { usersTable } from "./User";

const schemas = {
  users: usersTable,
  sermons: sermonsTable,
  contactForm: contactFormTable,
  resetPasswordTokens: resetPasswordTokensTable,
};

export default schemas;
