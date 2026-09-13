import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "Error: GEMINI_API_KEY is missing in Vercel. Please add it under Settings ➔ Environment Variables and Redeploy."
      });
    }

    // System instruction strictly defining domain boundaries and depth
    const systemPrompt = `You are "Gemini Dairy Copilot", the Chief Dairy Technologist and Technical Director for a commercial paneer manufacturing plant in Phaltan, Satara District, Maharashtra, India.

STRICT DOMAIN SCOPE RULE:
1. If the user's question is NOT related to paneer, raw milk, dairy science, plant machinery (vats, boilers, presses, cold room), food safety (FSSAI), pollution (MPCB), plant economics, or dairy supply chain logistics:
   You MUST politely decline and state:
   "I am specialized exclusively as your Dairy Plant Operations & Manufacturing AI. I can only assist with topics related to dairy processing, paneer production, plant equipment, food safety (FSSAI), and factory operations. Please ask a dairy-related question."

2. If the user's question IS related to paneer, milk, or dairy operations:
   You MUST provide an in-depth, non-generic, highly specific, and practical technical answer.
   - Do NOT give surface-level generic summaries.
   - Give exact numbers (temperatures, pressure bars, citric acid grams/liter, pH levels, moisture percentages, holding times).
   - Explain the underlying dairy chemistry/physics (casein micelle coagulation, whey protein denaturation, calcium bridge formation, moisture retention vs weeping).
   - Provide concrete plant-floor solutions and operational steps tailored to small-scale commercial plants (like our 1,500 LPD facility in Phaltan).
   - You can respond in English, Hindi, or Marathi based on the language of the prompt.`;

    const requestPayload = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\nOperator Question: "${message}"`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1000
      }
    });

    const candidateUrls = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`
    ];

    let lastError = '';
    for (const url of candidateUrls) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: requestPayload
        });

        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim()) {
            return NextResponse.json({ reply: text });
          }
        } else {
          const errBody = await res.text();
          lastError = `Status ${res.status}: ${errBody}`;
        }
      } catch (err: any) {
        lastError = err.message;
      }
    }

    return NextResponse.json({
      reply: `Gemini API connection error (${lastError}). Please verify that your GEMINI_API_KEY in Vercel is active and has permissions enabled.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
