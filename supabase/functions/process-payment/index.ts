import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CULQI_SECRET_KEY = "sk_test_ey9n1RvqNzbjwNDJ";
const CULQI_RSA_ID = "be69e8b4-72f5-4c8c-8617-c8cef4384051";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { token, amount, email, job_id, job_title } = await req.json();

    if (!token || !amount || !email) {
      return new Response(
        JSON.stringify({ error: "Faltan datos requeridos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Crear cargo en Culqi
    const chargeRes = await fetch("https://api.culqi.com/v2/charges", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CULQI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Culqi trabaja en céntimos
        currency_code: "PEN",
        email,
        source_id: token,
        description: `Cachuelos - ${job_title || "Trabajo"}`,
        metadata: { job_id },
      }),
    });

    const charge = await chargeRes.json();

    if (!chargeRes.ok || charge.object === "error") {
      return new Response(
        JSON.stringify({ error: charge.user_message || "Error al procesar el pago" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, charge_id: charge.id, amount: charge.amount }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error interno: " + err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});