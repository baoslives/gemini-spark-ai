import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, hasReferenceImage, referenceImageDescription } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Optimizing prompt:", { prompt, hasReferenceImage });

    const systemPrompt = `You are an expert prompt engineer specializing in AI image generation for luxury fashion photography and editorial mockups. Your task is to take a user's rough prompt and transform it into a detailed, professional prompt that will generate stunning fashion product mockup images.

Guidelines:
- Enhance the prompt with specific details about lighting, composition, and atmosphere
- Add professional fashion photography terminology (editorial, lookbook, campaign, flat-lay, etc.)
- Include details about textures, fabrics, and materials (leather grain, cashmere weave, silk sheen)
- Specify warm, earthy tones: camel, burnt orange, ivory, cognac, sand, terracotta
- Add styling context: Parisian streets, minimalist interiors, textured surfaces
- Include camera angles and depth of field when relevant
- Keep the prompt focused on the product while enhancing the editorial scene
- If the user mentions a reference image, incorporate its style into the optimization
- Always output just the optimized prompt text, nothing else

${hasReferenceImage ? \`Note: The user has uploaded a reference image. \${referenceImageDescription ? \`Description: \${referenceImageDescription}\` : 'Consider incorporating similar styling, lighting, and composition from their reference.'}\` : ''}\`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please optimize this prompt for product mockup image generation:\n\n"${prompt}"` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const optimizedPrompt = data.choices?.[0]?.message?.content?.trim();

    console.log("Optimized prompt:", optimizedPrompt);

    return new Response(JSON.stringify({ optimizedPrompt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("optimize-prompt error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
