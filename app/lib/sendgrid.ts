import sgMail from "@sendgrid/mail";
const sendgridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridApiKey ?? "");

export default sgMail;
