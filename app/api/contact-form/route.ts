import { NextResponse } from "next/server";
import sgMail from "@/app/lib/sendgrid";
import { createFormSubmission } from "@/app/lib/fauna";

export async function POST(req: Request) {
  // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

  type Data = {
    name?: string;
    error?: any;
  };

  const body = await req.json();

  console.log("submit-contact-form.ts: ", body);
  const { name, email, message, phone } = body;
  //   if (!name || !email || !message || !phone) {
  //     NextResponse.json({
  //       error: "Name, Email, Phone, and Message are required",
  //     });
  //   }

  try {
    const faunares = await createFormSubmission({
      name,
      email,
      message,
      phone,
    });
    const msg = {
      to: ["zdummerth@gmail.com", "captain@integraldeveloping.com"], // Change to your recipient
      //   replyTo: email,
      from: "mailer@integraldeveloping.com", // Change to your verified sender
      subject: `Integral Developing Messsage from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message} \nPhone: ${phone}`,
    };
    const sengridres = await sgMail.sendMultiple(msg);
    console.log("Message sent: ", sengridres);
    // console.log("Form Submitted: ", faunares);

    return NextResponse.json({ name });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Internal Error" });
  }

  //   return NextResponse.json({ name: "testing" });
}
