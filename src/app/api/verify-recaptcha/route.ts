// app/api/verify-recaptcha/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

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

    console.log("DATA Google Response", data)

    if (!data.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validación fallida",
          errors: data["error-codes"],
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, score: data.score }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Error del servidor" }),
      { status: 500 }
    );
  }
}
