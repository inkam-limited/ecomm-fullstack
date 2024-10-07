import { Resend } from "resend";
import { InvoiceEmail } from "../components/emails/InvoiceEmail";
import { render } from "@react-email/components";

const resend = new Resend("YOUR_RESEND_API_KEY");

export const sendInvoiceEmail = async ({
  client,
  invoice,
}: {
  client: any;
  invoice: any;
}) => {
  try {
    const emailHtml = await render(InvoiceEmail({ client, invoice }));
    const response = await resend.emails.send({
      from: "yourcompany@domain.com",
      to: client.email,
      subject: "Your Invoice",
      html: emailHtml,
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
