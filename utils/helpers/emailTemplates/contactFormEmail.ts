const contactFormEmail = (
  senderName: string,
  senderEmail: string,
  subject: string,
  message: string,
) => {
  return `
      Sender name: ${senderName} <br />
      Sender email: ${senderEmail} <br />
      Subect: ${subject} <br />
      Message: ${message} <br />
    `;
};

export { contactFormEmail };
