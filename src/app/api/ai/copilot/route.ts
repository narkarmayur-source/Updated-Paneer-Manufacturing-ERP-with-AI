import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Built-in Industrial Dairy Knowledge Base (Instant Fallback)
    const getLocalExpertAnswer = (query: string): string => {
      const q = query.toLowerCase();
      if (q.includes('temp') || q.includes('coag') || q.includes('heat') || q.includes('paneer') || q.includes('pneer')) {
        return "Optimal Temperature Setpoints for Phaltan Plant:\n1. Pasteurization: 82°C–85°C (hold 5 min to denature whey proteins).\n2. Controlled Cooling: 72°C–74°C (optimum coagulation window).\n3. Coagulation: Add 1.5% food-grade citric acid solution at 73°C until clear greenish whey separates at pH 5.30–5.35.\n4. Chilling: Immerse pressed blocks in 4°C water for 2 hours.";
      }
      if (q.includes('crumb') || q.includes('press') || q.includes('hard') || q.includes('soft') || q.includes('defect')) {
        return "Crumbly or Brittle Paneer Troubleshooting:\n- Cause 1: Coagulation temperature was too high (>78°C) or curd was agitated violently.\n- Cause 2: Over-acidification (pH dropped below 5.20).\n- Fix: Ensure coagulation occurs strictly at 72°C–74°C with gentle stirring. Set pneumatic press to 2.8 bar for 20 minutes.";
      }
      if (q.includes('fssai') || q.includes('moist') || q.includes('fat') || q.includes('rule') || q.includes('standard')) {
        return "FSSAI Statutory Standards for Paneer:\n- Maximum Moisture: 60.0% (Regular Paneer) | 70.0% (Low-Fat Paneer).\n- Minimum Milk Fat (Dry Basis): 50.0% (Regular Paneer).\n- Microbial: Coliform < 10 CFU/g; zero tolerance for Salmonella & Listeria.\n- Vacuum-packed shelf life: 14–18 days at continuous 2°C–4°C.";
      }
      if (q.includes('citric') || q.includes('acid') || q.includes('dose')) {
        return "Citric Acid Dosing Ratio:\n- Standard: 2.0g to 2.2g of food-grade citric acid crystals per liter of milk.\n- For a 750L batch: Dissolve ~1.55 kg citric acid in 30 liters of warm water (approx 1.5% strength) before adding.";
      }
      return "Chief Technologist Recommendation: For your Phaltan operations, maintain incoming standardized milk at 5.0%–5.2% Fat and 8.8% SNF to guarantee an 18.0%+ yield. Keep cold-room storage strictly between 2°C and 4°C.";
    };

    if (!apiKey) {
      return NextResponse.json({ reply: getLocalExpertAnswer(message) });
    }

    const systemPrompt = `You are the Chief Dairy Technologist and AI Plant Copilot for a commercial paneer plant in Phaltan, Satara District, Maharashtra, India.
Provide precise, practical, actionable advice on milk processing, FSSAI rules, yields, temperature setpoints, and troubleshooting.
Answer concisely in a direct, professional, plant-floor friendly tone (English, Hindi, or Marathi).`;

    const requestBody = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nOperator Query: ${message}` }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500,
      }
    });

    // 1. Try listing models to find an active model name for this key
    try {
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listRes = await fetch(listUrl);
      if (listRes.ok) {
        const listData = await listRes.json();
        const availableModels = listData?.models || [];
        const supportedModel = availableModels.find((m: any) =>
          m.supportedGenerationMethods?.includes('generateContent') &&
          (m.name?.includes('flash') || m.name?.includes('pro') || m.name?.includes('gemini'))
        );

        if (supportedModel) {
          const genUrl = `https://generativelanguage.googleapis.com/v1beta/${supportedModel.name}:generateContent?key=${apiKey}`;
          const genRes = await fetch(genUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
          });
          if (genRes.ok) {
            const genData = await genRes.json();
            const text = genData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return NextResponse.json({ reply: text });
          }
        }
      }
    } catch (e) {
      console.warn('Dynamic model discovery exception:', e);
    }

    // 2. Direct Fallback to stable endpoints
    const directEndpoints = [
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
    ];

    for (const ep of directEndpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        });
        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return NextResponse.json({ reply: text });
        }
      } catch (err) {
        // continue to next endpoint
      }
    }

    // 3. Graceful Expert Fallback (Zero downtime, instant technical answer)
    const fallbackAnswer = getLocalExpertAnswer(message);
    return NextResponse.json({ reply: fallbackAnswer });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
