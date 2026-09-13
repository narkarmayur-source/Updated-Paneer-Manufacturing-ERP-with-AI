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
        reply: `[Demo Mode - Add GEMINI_API_KEY in Vercel]: For standard 5.2% Fat milk: Heat to 83°C, cool to 73°C, and dose 1.5% citric acid solution (~2.08 g/L) to achieve clear green whey at pH 5.30-5.35.`
      });
    }

    const systemPrompt = `You are the Chief Dairy Technologist and AI Plant Copilot for a commercial paneer manufacturing plant in Phaltan, Satara District, Maharashtra, India.
You provide precise, practical, actionable advice on:
1. Milk quality, Fat/SNF two-axis pricing, and dockside adulteration screening.
2. Pasteurization (82-85°C) and controlled cooling.
3. Coagulation setpoints (71.5-74.0°C) and citric acid dosing (~2.0-2.2 g/L).
4. Pneumatic pressing (2.5-3.0 bar, 18-22 min) and water immersion chilling (4°C).
5. FSSAI standards (Moisture max 60%, Fat on Dry Basis min 50%) and microbial safety.
6. MPCB effluent / whey handling and CIP sanitization.
Answer concisely in a direct, professional, plant-floor friendly tone. You can reply in English, Hindi, or Marathi based on the query.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemPrompt}\n\nOperator Query: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600,
        }
      })
    });

    if (!response.ok) {
      return NextResponse.json({
        reply: `Error from Gemini API: ${response.status}. Please verify your GEMINI_API_KEY in Vercel.`
      }, { status: 500 });
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
