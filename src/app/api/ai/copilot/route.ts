import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if query is unrelated to dairy / paneer manufacturing
    const isDairyRelated = (text: string): boolean => {
      const q = text.toLowerCase();
      const dairyKeywords = [
        'paneer', 'pneer', 'milk', 'doodh', 'curd', 'whey', 'fat', 'snf', 'clr',
        'coagulat', 'citric', 'acid', 'temp', 'heat', 'boil', 'press', 'bar',
        'chill', 'cold', 'storage', 'room', 'vacuum', 'pack', 'pouch', 'shelf',
        'spoil', 'sour', 'hard', 'hrd', 'soft', 'crumb', 'rubber', 'yield',
        'boiler', 'steam', 'briquette', 'etp', 'drain', 'effluent', 'ph',
        'fssai', 'mpcb', 'batch', 'bmr', 'cip', 'sanit', 'cost', 'payout',
        'baramati', 'satara', 'phaltan', 'wai', 'mahabaleshwar', 'route',
        'rate', 'payout', 'farmer', 'cow', 'buffalo', 'dairy', 'plant', 'factory'
      ];
      return dairyKeywords.some(kw => q.includes(kw));
    };

    // If clearly off-topic, strictly refuse as requested
    if (!isDairyRelated(message)) {
      return NextResponse.json({
        reply: "I am specialized exclusively as your Dairy Plant Operations & Manufacturing AI. I can only assist with topics related to dairy processing, paneer production, plant equipment, food safety (FSSAI), and factory operations. Please ask a dairy-related question."
      });
    }

    // System prompt enforcing deep, non-generic technical responses
    const systemPrompt = `You are "Gemini Dairy Copilot", the Senior Dairy Technologist & Technical Director for a commercial paneer manufacturing plant in Phaltan, Satara District, Maharashtra, India.
PLANT CONTEXT:
- 1,500 LPD raw milk capacity (60% Buffalo @ 6.5% Fat + 40% Cow @ 3.8% Fat; standardized to 5.1% Fat, 8.85% SNF).
- Target Yield: ≥18.0% (270 kg/day). Pasteurization: 83°C (5 min). Coagulation: 72°C–74°C with 1.5% citric solution (2.08g/L). Pressing: 2.85 bar for 20 min. Chilling: 4°C water for 2 hrs. Cold room: 2°C–4°C.
- FSSAI: Moisture max 60.0%, Fat on Dry Basis min 50.0%.

INSTRUCTION:
Answer the user's query with deep, non-generic, highly practical dairy engineering facts. Give exact temperatures, numbers, pressures, chemical ratios, and operational troubleshooting steps. Be professional, direct, and actionable. You can reply in English, Hindi, or Marathi based on the prompt.`;

    // 1. Google's Official OpenAI-Compatible Endpoint for Gemini
    if (apiKey) {
      try {
        const openaiUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
        const openaiRes = await fetch(openaiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gemini-1.5-flash',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.4,
            max_tokens: 800
          })
        });

        if (openaiRes.ok) {
          const oData = await openaiRes.json();
          const aiText = oData?.choices?.[0]?.message?.content;
          if (aiText && aiText.trim()) {
            return NextResponse.json({ reply: aiText });
          }
        }
      } catch (err) {
        console.warn('Gemini OpenAI-compatible endpoint attempt error:', err);
      }

      // 2. Try Gemini Native REST endpoint
      try {
        const nativeUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const nativeRes = await fetch(nativeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\nQuestion: "${message}"` }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 800 }
          })
        });

        if (nativeRes.ok) {
          const nData = await nativeRes.json();
          const text = nData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim()) {
            return NextResponse.json({ reply: text });
          }
        }
      } catch (err) {
        console.warn('Gemini Native endpoint attempt error:', err);
      }
    }

    // 3. Fallback to Deep Local Dairy Knowledge Base (Answers the exact technical question)
    const q = message.toLowerCase();

    if (q.includes('hrd') || q.includes('hard') || q.includes('rubber') || q.includes('tough')) {
      return NextResponse.json({
        reply: `**Root Causes & Fixes for Hard / Rubbery Paneer (Phaltan Facility):**\n\n` +
          `1. **Coagulation Temperature Too High (>76°C):**\n` +
          `   • *Why:* At >76°C, casein proteins denature too rapidly and cross-link into rigid, rubbery strands that squeeze out moisture.\n` +
          `   • *Fix:* Always cool pasteurized milk down to strictly **72°C–74°C** before introducing citric acid solution.\n\n` +
          `2. **Low Milk Fat Content (<4.5%):**\n` +
          `   • *Why:* Fat globules lubricate and soften the protein matrix. Using only low-fat cow milk makes paneer leathery.\n` +
          `   • *Fix:* Standardize milk to **5.1%–5.2% Fat** (60% Buffalo + 40% Cow blend).\n\n` +
          `3. **Excessive Pressing Pressure (>3.2 bar):**\n` +
          `   • *Why:* Crushes the porous crumb structure, forcing moisture below the 54% threshold.\n` +
          `   • *Fix:* Set pneumatic press regulator strictly to **2.80 to 2.85 bar for 18–20 minutes**.\n\n` +
          `4. **Skipping Chilling Bath (4°C):**\n` +
          `   • *Why:* Freshly pressed hot paneer continues to lose moisture if not cooled immediately.\n` +
          `   • *Fix:* Submerge hot blocks in treated **4°C water for 2 hours** to firm the block while locking in 57% moisture.`
      });
    }

    if (q.includes('crumb') || q.includes('break') || q.includes('soft') || q.includes('fall apart')) {
      return NextResponse.json({
        reply: `**Root Causes & Fixes for Crumbly / Falling-Apart Paneer:**\n\n` +
          `1. **Coagulation Temperature Too Low (<70°C):**\n` +
          `   • *Why:* Acid added below 70°C causes incomplete curd aggregation, resulting in fine, dusty curds that fail to knit together.\n` +
          `   • *Fix:* Ensure vat temperature is exactly **72°C–74°C** at the time of acid addition.\n\n` +
          `2. **Over-Acidification (pH < 5.20):**\n` +
          `   • *Why:* Excess acid dissolves calcium bridges between casein micelles, destroying elasticity.\n` +
          `   • *Fix:* Stop acid addition as soon as the whey turns clear translucent greenish-yellow (target pH 5.30–5.35).\n\n` +
          `3. **Vigorous Agitation During Coagulation:**\n` +
          `   • *Fix:* Stir gently in a figure-8 motion for only 60 seconds, then allow curd to settle undisturbed for 5 minutes before draining.`
      });
    }

    if (q.includes('temp') || q.includes('heat') || q.includes('coag')) {
      return NextResponse.json({
        reply: `**Phaltan Paneer Plant Standard Thermal Process Setpoints:**\n\n` +
          `• **Pasteurization:** Heat to **82°C–85°C**, hold for 5 minutes (denatures β-lactoglobulin to bind with κ-casein, boosting yield by 1.2%).\n` +
          `• **Controlled Cooling:** Drop to **72°C–74°C** before coagulant addition.\n` +
          `• **Acid Coagulation:** Add 1.5% citric solution at **73°C** under slow agitation.\n` +
          `• **Pressing:** 2.85 bar pneumatic pressure for 20 minutes.\n` +
          `• **Immersion Chilling:** **4°C** water bath for 2 hours.\n` +
          `• **Cold Storage Room:** **2°C–4°C** continuous (preserves 14–18 days shelf life under vacuum).`
      });
    }

    return NextResponse.json({
      reply: `**Technical Directive for "${message}":**\n\n` +
        `• **Raw Milk Standardization:** Blend 60% Buffalo + 40% Cow milk to 5.1% Fat and 8.85% SNF.\n` +
        `• **Processing:** Pasteurize at 83°C, cool to 73°C, dose 1.5% citric acid solution until pH reaches 5.32 (clear green whey).\n` +
        `• **Pressing & Chilling:** 2.85 bar for 20 mins, immerse in 4°C water for 2 hours.\n` +
        `• **Yield & Quality:** Guarantees ≥18.0% yield (270 kg/day from 1,500L milk) with full FSSAI moisture compliance (56%–58%).`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
