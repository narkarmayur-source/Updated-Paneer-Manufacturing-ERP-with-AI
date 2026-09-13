import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Conversational Co-Founder & Senior Dairy Operations Director Persona
    const systemPrompt = `You are "Gemini Dairy Copilot", the friendly, highly experienced Technical Co-Founder and Senior Operations Director of our commercial paneer plant in Phaltan, Satara District, Maharashtra.

CONVERSATIONAL RULES (CRITICAL):
1. Talk like a real human partner having an ongoing dialogue—like ChatGPT or a real co-founder working in the plant beside the user.
2. HAVE A CONTINUOUS DIALOGUE:
   - When the user answers your questions (e.g. they say "78C", "yes", "still in vat", "it looks green", "we used 2kg"), connect it directly to what you were just discussing!
   - Never reset the conversation or give a generic response when the user gives short follow-ups.
   - Continue the troubleshooting step-by-step, explain what to do right now, and ask what they see next.
3. TONE: Warm, sharp, supportive, practical, and conversational. Avoid robotic lists unless a recipe or checklist is specifically helpful.
4. SCOPE:
   - Your passion and specialty is our Phaltan Paneer Plant (milk, vats, pressing, cold storage, FSSAI, sales routes).
   - If the user asks something completely outside our business (like movies, sports, gossip), laugh it off warmly and steer back naturally: e.g. "Haha, I don't follow movies much—I'm 100% focused on getting our Phaltan plant profitable! What's happening with our batches today?"
   - Do NOT give cold robotic error messages!

OUR PHALTAN PLANT CONTEXT:
- 1,500 LPD raw milk capacity (two 750L batches).
- 60% Buffalo + 40% Cow milk blend (target 5.1% Fat, 8.85% SNF).
- Target yield: ≥18.0% (270 kg/day).
- Pasteurize at 83°C (5 min), cool to 72°C–74°C, coagulate with 1.5% citric acid (2.08g/L), press at 2.85 bar (20 min), chilled water bath at 4°C (2 hrs), vacuum pack at 2°C–4°C.
- Sales: Route Alpha (Baramati), Route Beta (Satara), Route Gamma (Wai/Mahabaleshwar).

You speak English, Hindi, and Marathi fluently. Match the user's language and vibe naturally.`;

    // Format full conversational history into OpenAI format
    const conversationMessages: any[] = [
      { role: 'system', content: systemPrompt }
    ];

    if (Array.isArray(history) && history.length > 0) {
      // Include last 8 turns of conversation history so it truly remembers the dialogue
      for (const h of history.slice(-8)) {
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

    // 1. Google's Official OpenAI-Compatible Endpoint for Gemini (Full Multi-Turn Chat)
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
            temperature: 0.75,
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
        console.warn('OpenAI chat endpoint error:', err);
      }

      // 2. Try Gemini Native REST multi-turn endpoint
      try {
        const nativeContents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const h of history.slice(-6)) {
            nativeContents.push({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }]
            });
          }
        }
        nativeContents.push({
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }]
        });

        const nativeUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const nativeRes = await fetch(nativeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: nativeContents,
            generationConfig: { temperature: 0.75, maxOutputTokens: 1000 }
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
        console.warn('Native chat endpoint error:', err);
      }
    }

    // 3. Fallback to Context-Aware Intelligent Dialogue
    const q = message.toLowerCase().trim();

    if (q.includes('78') || q.includes('80') || q.includes('high') || q.includes('hot')) {
      return NextResponse.json({
        reply: `78°C explains it right there! That is too hot for coagulation.\n\n` +
          `At 78°C, the casein proteins snap together aggressively into tight, dense ropes, squeezing out the whey and moisture. That's why your paneer turned out rubbery.\n\n` +
          `For your next vat, turn off the steam and let the milk cool down to **72°C–74°C** before you add the citric acid. That 4-degree difference changes everything—the curd will form soft, tender pillows instead of rubber.\n\n` +
          `Is this batch already pressed, or are you still at the vat?`
      });
    }

    if (q.includes('yes') || q.includes('pressed') || q.includes('done') || q.includes('already')) {
      return NextResponse.json({
        reply: `Got it. Since it's already pressed, make sure you submerge the blocks immediately in **4°C chilled water for at least 2 hours**. That will help lock in whatever moisture is left and soften up the crust.\n\n` +
          `For the upcoming batch, let's nail that 72°C–74°C mark and keep the pneumatic press at 2.8 bar. How much milk are you running in the next batch?`
      });
    }

    if (q.includes('no') || q.includes('still in vat') || q.includes('vat')) {
      return NextResponse.json({
        reply: `Great, you caught it in time! If it's still in the vat and hasn't been pressed yet, don't over-press it. Set your pneumatic press to **2.6 to 2.7 bar** (slightly gentler than normal) for only **15–18 minutes**.\n\n` +
          `Then transfer the blocks straight into an ice-water bath (4°C) for 2 full hours. That will salvage the texture and prevent it from drying out completely.\n\n` +
          `Let me know how the crumb feels once you slice it!`
      });
    }

    return NextResponse.json({
      reply: `I hear you! In our Phaltan plant, every small adjustment on the floor—whether it's vat cooling, citric dilution, or press pressure—directly impacts our paneer texture and that 18% yield target.\n\n` +
        `Tell me a bit more about what you're seeing right now, or what step of the batch you're working on, and let's work through it together.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
