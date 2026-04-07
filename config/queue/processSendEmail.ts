import "dotenv/config";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import logger from "../../utils/logger";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";
const FROM_ADDRESS = `Eternal Rhema Life Ministries <noreply@${MAILGUN_DOMAIN}>`;

const processSendEmail = async (job: any) => {
  const { to, subject, text, html } = job.data;

  try {
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      from: FROM_ADDRESS,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
    });

    logger.info(`Email sent via Mailgun: ${JSON.stringify(result)}`);
    return { success: true, id: result.id };
  } catch (error) {
    logger.error(`Failed to send email via Mailgun: ${JSON.stringify(error)}`);
    throw error;
  }
};

export default processSendEmail;
