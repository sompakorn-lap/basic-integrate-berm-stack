import { createTransport } from "nodemailer";

type MailType = {
  to: string;
  subject: string;
  html: string;
};

const user = process.env.GMAIL_USERNAME as string;
const pass = process.env.GMAIL_PASSWORD as string;
const from = user;
const transport = createTransport({
  service: "gmail",
  auth: { user, pass }
});

class Gmail {
  static async send({ to, subject, html }: MailType){
    const { messageId } = await transport.sendMail({ from, to, subject, html });
    return messageId;
  }
}

export default Gmail;