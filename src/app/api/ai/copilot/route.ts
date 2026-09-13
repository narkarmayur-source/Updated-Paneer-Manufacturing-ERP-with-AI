import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Comprehensive Industrial Dairy Knowledge Base & Context
    const systemInstruction = `You are "Gemini Dairy Copilot", the Senior Dairy Technologist & Plant Operations Director for a commercial paneer manufacturing plant located in Phaltan, Satara District, Maharashtra, India.

PLANT CONTEXT & BASELINE METRICS:
- Daily Capacity: 1,500 Liters/day raw milk (two staggered 750L batches).
- Raw Milk Blend: 60% Buffalo Milk (6.5% Fat, 9.0% SNF) + 40% Cow Milk (3.8% Fat, 8.5% SNF) standardized to 5.1%–5.2% Fat and 8.8%–8.9% SNF.
- Target Yield: Strictly 18.0% minimum (5.55 L milk per 1.0 kg fresh paneer; 270 kg paneer daily).
- Processing Parameters:
  * Pasteurization: 82°C–85°C held for 5 minutes.
  * Coagulation Temperature: Exactly 72°C–74°C (never coagulate above 76°C to avoid rubbery texture, or below 70°C to avoid soft, crumbly curd loss).
  * Coagulant: Food-grade citric acid monohydrate (1.5% strength solution). Dosing: 2.0g to 2.2g dry citric acid per liter of milk (1.55 kg dissolved in 30L warm water for a 750L vat).
  * Coagulation pH: Target 5.30 to 5.35 (whey must turn translucent pale greenish-yellow).
  * Pressing: 4-head pneumatic press at 2.8 to 3.0 bar for 18–22 minutes.
  * Chilling: Immersion in treated 4°C water bath for 2 hours to firm blocks.
  * Packaging & Storage: Vacuum-sealed multi-layer barrier pouches stored at 2°C–4°C in walk-in cold room (14–18 days shelf life).
- Commercial Economics:
  * Milk procurement: Maharashtra two-axis pricing (Fat ₹5.60/unit, SNF ₹1.55/unit) → ~₹41.50/L delivered.
  * Finished Cost/kg: ₹288.54/kg.
  * Sales Realization: B2B wholesale ₹335/kg, Wai/Mahabaleshwar tourist HORECA ₹365/kg, Retail 200g pack ₹370/kg.
- Statutory Compliance:
  * FSSAI: Moisture max 60.0%, Milk Fat on Dry Basis min 50.0%, Coliform <10 CFU/g.
  * MPCB: High-BOD whey segregated (3,000L tank) for cattle feed/spray drying; wash-water neutralized to pH 6.5–8.5 before discharge.

RESPONSE GUIDELINES:
1. Give detailed, authoritative, highly practical dairy engineering answers. Even for short queries (e.g. "paneer", "temp", "crumbly"), provide structured technical guidance, root causes, exact numbers, and operational checklists.
2. When answering troubleshooting queries, always provide: Problem Analysis, Root Cause, Exact Machine/Process Fix, and Preventive Control.
3. You speak English, Hindi, and Marathi fluently. If the user writes in Hindi, Marathi, or mixed Hinglish/Marathi, respond helpfully in that language or clear bilingual format.
4. Keep the tone professional, encouraging, and plant-floor actionable.`;

    if (!apiKey) {
      return NextResponse.json({
        reply: `**Phaltan Paneer Plant Standard Technical Guide:**\n\n• **Standard Recipe (750L Batch):** Standardize milk to 5.1% Fat & 8.8% SNF. Heat to 83°C (hold 5 min), cool to 73°C.\n• **Coagulant Dosing:** Dissolve 1.55 kg food-grade citric acid in 30L warm water. Add gradually with gentle stirring until green whey clears (pH 5.32).\n• **Pressing:** Apply 2.85 bar pneumatic pressure for 20 mins.\n• **Chilling & Yield:** Chill blocks in 4°C water for 2 hours. Expected yield: 138–140 kg (18.1%).\n\n*(Note: Add GEMINI_API_KEY in Vercel to unlock full conversational AI).*`
      });
    }

    const contents: any[] = [];
    
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-4)) {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `[SYSTEM INSTRUCTION & PLANT METRICS]:\n${systemInstruction}\n\n[USER INQUIRY]:\n${message}`
        }
      ]
    });

    const requestBody = JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.6,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    });

    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        });

        if (res.ok) {
          const data = await res.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
      } catch (err) {
        // try next endpoint
      }
    }

    return NextResponse.json({
      reply: `**Phaltan Plant Processing Directive for "${message}":**\n\n1. **Standardization:** Blend Buffalo (60%) & Cow (40%) milk to target 5.1% Fat & 8.8% SNF.\n2. **Heating & Coagulation:** Pasteurize at 83°C (5 min), drop temperature to 72°C–74°C, add 1.5% citric solution (2.08g/L).\n3. **Pressing & Yield:** Press at 2.85 bar for 20 mins; soak in 4°C water for 2 hours to lock in moisture (57%) and guarantee 18.0%+ yield.\n4. **Cold Chain:** Store under vacuum at 2°C–4°C for 14–18 days shelf life.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
