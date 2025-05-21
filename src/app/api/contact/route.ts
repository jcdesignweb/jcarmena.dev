import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_TO = "juan14nob@gmail.com"
const EMAIL_FROM = "onboarding@resend.dev"

type Message = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

async function sendMessage(message: Message) {
  console.info("adding a new Message", message);
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `jcarmena.dev mensaje: ${message.subject}`,
    html: `
        <h3>Nuevo mensaje desde jcarmena.dev </h3>
        <p><strong>Nombre:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.message}</p>
      `,
  });

  if (error) console.error(error);

  if (data) {
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  const body = await req.json();

  const { token, name, email, subject, message } = body;

  const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  if (!token || typeof token !== "string") {
    return new Response(
      JSON.stringify({ success: false, message: "Token faltante o inválido" }),
      { status: 400 }
    );
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  try {
    const response = await fetch(verificationURL, {
      method: "POST",
    });

    const data = await response.json();

    if (!data.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "captcha failed",
          errors: data["error-codes"],
        }),
        { status: 400 }
      );
    }

    const newMessage: Message = {
      name,
      email,
      subject,
      message,
    };

    const isSend = await sendMessage(newMessage);
    if (!isSend) {
      return new Response(
        JSON.stringify({ success: false, message: "email has failed" }),
        {
          status: 400,
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
