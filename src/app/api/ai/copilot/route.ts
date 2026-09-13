import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if query is completely unrelated to plant, business, dairy, or factory operations
    const isRelevant = (text: string): boolean => {
      const q = text.toLowerCase().trim();
      const conversationalPings = ['hi', 'hello', 'hey', 'namaste', 'kaise ho', 'kasa ahes', 'thanks', 'thank you', 'ok', 'good morning', 'help'];
      if (conversationalPings.some(p => q === p || q.startsWith(p + ' '))) return true;

      const dairyBusinessKeywords = [
        'paneer', 'pneer', 'milk', 'doodh', 'curd', 'whey', 'fat', 'snf', 'clr',
        'coagulat', 'citric', 'acid', 'temp', 'heat', 'boil', 'press', 'bar',
        'chill', 'cold', 'storage', 'room', 'vacuum', 'pack', 'pouch', 'shelf',
        'spoil', 'sour', 'hard', 'hrd', 'soft', 'crumb', 'rubber', 'yield',
        'boiler', 'steam', 'briquette', 'etp', 'drain', 'effluent', 'ph',
        'fssai', 'mpcb', 'batch', 'bmr', 'cip', 'sanit', 'cost', 'payout',
        'baramati', 'satara', 'phaltan', 'wai', 'mahabaleshwar', 'route',
        'rate', 'farmer', 'cow', 'buffalo', 'dairy', 'plant', 'factory',
        'sales', 'profit', 'margin', 'business', 'money', 'budget', 'customer',
        'horeca', 'hotel', 'restaurant', 'worker', 'labor', 'operator', 'shift'
      ];
      return dairyBusinessKeywords.some(kw => q.includes(kw));
    };

    if (!isRelevant(message)) {
      return NextResponse.json({
        reply: "I'm right here with you, but my whole focus is on making our Phaltan paneer plant successful, compliant, and profitable! Let's keep our heads on the plant—milk procurement, recipes, machine operations, or sales dispatches. What's happening on the floor right now?"
      });
    }

    // Persona: Technical Co-Founder & Senior Operations Director
    const systemPrompt = `You are "Gemini Dairy Copilot", the Technical Co-Founder and Senior Operations Director of our commercial paneer manufacturing plant in Phaltan, Satara District, Maharashtra.

YOUR PERSONALITY & CONVERSATIONAL STYLE:
1. Talk like a seasoned, supportive, intelligent human co-founder and dairy engineer having a real conversation—NOT a robotic FAQ bot.
2. Be natural, warm, thoughtful, and articulate. When answering questions, explain the "why" behind things conversationally, share practical insights from plant-floor experience, and proactively ask helpful follow-ups (e.g., asking about their current batch temperature, fat readings, or customer feedback).
3. If the user writes in short phrases or typos (like "why pneer is so hrd"), understand immediately, empathize with the frustration, explain what is chemically happening to the milk proteins in plain language, give concrete steps to fix it, and offer guidance on what to check next.
4. You speak English, Hindi, and Marathi fluently. Match the user's conversational vibe naturally (English, Hindi, Marathi, or Hinglish).

OUR PLANT CONTEXT (PHALTAN, SATARA):
- 1,500 LPD raw milk capacity (two 750L batches daily).
- Standardized blend: 60% Buffalo Milk + 40% Cow Milk targetting 5.1%–5.2% Fat and 8.85% SNF.
- Target Yield: strictly 18.0%+ (270 kg finished paneer per day).
- Core Process: Pasteurize at 83°C (5 min), cool to 72°C–74°C, coagulate with 1.5% food-grade citric acid (2.08g/L), press at 2.85 bar for 20 mins, immerse in 4°C water for 2 hours, vacuum seal, and store at 2°C–4°C (14–18 days shelf life).
- Distribution: Route Alpha (Baramati), Route Beta (Satara/Shirwal), Route Gamma (Wai/Mahabaleshwar resorts). Wholesale B2B at ₹335/kg, tourism at ₹365/kg.
- Standards: FSSAI (Moisture ≤60%, FDM ≥50%).

Always be constructive, conversational, mathematically grounded, and genuinely helpful as a trusted partner.`;

    const conversationMessages: any[] = [
      { role: 'system', content: systemPrompt }
    ];

    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-6)) {
        conversationMessages.push({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text
        });
      }
    }

    conversationMessages.push({
      role: 'user',
      content: message
    });

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
            messages: conversationMessages,
            temperature: 0.7,
            max_tokens: 1000
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
        console.warn('OpenAI endpoint error:', err);
      }

      try {
        const nativeUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const nativeRes = await fetch(nativeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `${systemPrompt}\n\nRecent context: ${JSON.stringify(history?.slice(-3) || [])}\n\nUser: ${message}` }]
              }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
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
        console.warn('Native endpoint error:', err);
      }
    }

    // Conversational Human-like Fallback (Thoughtful & Partner-like)
    const q = message.toLowerCase();

    if (q.includes('hrd') || q.includes('hard') || q.includes('rubber') || q.includes('tough')) {
      return NextResponse.json({
        reply: `Hard or rubbery paneer is one of the most common headaches on the dairy plant floor, but it almost always comes down to two things: **temperature** and **fat content**.\n\n` +
          `Here is what is likely happening in your vat right now:\n\n` +
          `1. **You might be adding citric acid while the milk is still too hot (>76°C).**\n` +
          `   When milk is too hot, the casein proteins snap together into tight, dense ropes instead of an open, tender sponge. You get a firm block, but once you cook with it, it feels like rubber. Make sure your operator checks the digital probe and lets the milk cool to **72°C–74°C** before adding the citric solution.\n\n` +
          `2. **The fat percentage might be lower than expected (<4.5%).**\n` +
          `   Fat globules act like natural cushions between protein strands. If you received mostly cow milk with low fat, the paneer will inherently turn tougher. Are you running our 60:40 buffalo-to-cow blend today?\n\n` +
          `3. **Pneumatic pressing pressure:**\n` +
          `   Check the air gauge on our press—keep it at **2.8 bar for 20 minutes**. If someone dialed it up past 3.2 bar, it squeezes out all the natural moisture.\n\n` +
          `4. **Are you giving it the full 2-hour chilling bath at 4°C?**\n` +
          `   Dropping the hot block straight into ice-cold water halts moisture evaporation and plumps the crumb to a soft 57% moisture.\n\n` +
          `Tell me what temperature you coagulated at today, and let's dial it in!`
      });
    }

    if (q.includes('crumb') || q.includes('break') || q.includes('soft') || q.includes('fall apart')) {
      return NextResponse.json({
        reply: `Crumbly paneer usually happens when the curd doesn't knit together properly. Think of it like this: the protein bonds are either too weak or broke apart during stirring.\n\n` +
          `Here are the 3 culprits to check on the floor:\n\n` +
          `• **Coagulating below 70°C:** If the milk got too cold before you added the acid, the curd particles stay fine and dusty instead of forming big, fluffy pillows.\n` +
          `• **Too much citric acid (pH dropped below 5.2):** Excess acid literally strips away the calcium glue that holds curd together. As soon as that whey turns pale translucent green, stop adding acid immediately!\n` +
          `• **Stirring too fast:** Operators should gently glide the paddle in a slow figure-8 for about 60 seconds, then let it rest for 5 minutes.\n\n` +
          `How is your whey looking today—is it clear greenish-yellow, or milky white?`
      });
    }

    return NextResponse.json({
      reply: `I'm right here with you on the Phaltan floor! Regarding **"${message}"**:\n\n` +
        `At our 1,500 LPD scale, consistency is everything. Whether we're standardizing our 60:40 milk blend, watching that critical 72°C–74°C coagulation window, or keeping our cold room steady at 3°C for the Baramati and Mahabaleshwar runs, small details make the difference between an average product and top-tier fresh paneer.\n\n` +
        `What specific batch or machine step are you looking at right now? Let's solve it together.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
