/**
 * Cloudflare Worker: CODAP AI Proxy
 *
 * Proxies chat requests to the Google Gemini API, keeping the API key
 * secure on the server side. Supports both regular and streaming responses.
 */

export interface Env {
  GEMINI_API_KEY: string;
  GEMINI_MODEL: string;
  ALLOWED_ORIGINS: string;
}

/** Shape of a single message in the conversation */
interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

/** Request body sent from the frontend */
interface ChatRequest {
  messages: ChatMessage[];
  systemInstruction?: string;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
  };
}

// ─── CORS Helpers ───────────────────────────────────────────────────────────

function getCorsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = env.ALLOWED_ORIGINS;

  // If wildcard, allow any origin
  if (allowed === "*") {
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };
  }

  // Check against comma-separated list
  const allowedList = allowed.split(",").map((s) => s.trim());
  const matchedOrigin = allowedList.includes(origin) ? origin : "";

  return {
    "Access-Control-Allow-Origin": matchedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function handleOptions(request: Request, env: Env): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, env),
  });
}

// ─── Main Handler ───────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }

    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request, env);

    // ── Health Check ──────────────────────────────────────────────────────
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(
        JSON.stringify({ status: "ok", model: env.GEMINI_MODEL }),
        { headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    // ── Chat Endpoint ─────────────────────────────────────────────────────
    if (url.pathname === "/api/chat" && request.method === "POST") {
      return handleChat(request, env, corsHeaders);
    }

    // ── Stream Endpoint ───────────────────────────────────────────────────
    if (url.pathname === "/api/chat/stream" && request.method === "POST") {
      return handleChatStream(request, env, corsHeaders);
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  },
} satisfies ExportedHandler<Env>;

// ─── Non-Streaming Chat ─────────────────────────────────────────────────────

async function handleChat(
  request: Request,
  env: Env,
  corsHeaders: HeadersInit,
): Promise<Response> {
  try {
    const body = (await request.json()) as ChatRequest;

    if (
      !body.messages ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return new Response(
        JSON.stringify({
          error: "messages array is required and must not be empty",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent`;

    const geminiBody: Record<string, unknown> = {
      contents: body.messages,
      generationConfig: body.generationConfig ?? {
        temperature: 1.0,
        maxOutputTokens: 4096,
        thinkingConfig: {
          includeThoughts: true,
          thinkingLevel: "minimal",
        },
      },
    };

    if (body.systemInstruction) {
      geminiBody.systemInstruction = {
        parts: [{ text: body.systemInstruction }],
      };
    }

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.GEMINI_API_KEY,
      },
      body: JSON.stringify(geminiBody),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: "Gemini API request failed",
          status: geminiResponse.status,
          details: errorText,
        }),
        {
          status: geminiResponse.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const data = (await geminiResponse.json()) as {
      candidates?: {
        content?: { parts?: { text?: string; thought?: boolean }[] };
      }[];
    };

    // Filter out thinking process parts and join only final answer
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text =
      parts
        .filter((p) => !p.thought)
        .map((p) => p.text)
        .filter((t) => t !== undefined)
        .join("") || "Maaf, saya tidak bisa merespons saat ini.";

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Worker error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

// ─── Streaming Chat ─────────────────────────────────────────────────────────

async function handleChatStream(
  request: Request,
  env: Env,
  corsHeaders: HeadersInit,
): Promise<Response> {
  try {
    const body = (await request.json()) as ChatRequest;

    if (
      !body.messages ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return new Response(
        JSON.stringify({
          error: "messages array is required and must not be empty",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:streamGenerateContent?alt=sse`;

    const geminiBody: Record<string, unknown> = {
      contents: body.messages,
      generationConfig: body.generationConfig ?? {
        temperature: 1.0,
        maxOutputTokens: 4096,
        thinkingConfig: {
          includeThoughts: true,
          thinkingLevel: "minimal",
        },
      },
    };

    if (body.systemInstruction) {
      geminiBody.systemInstruction = {
        parts: [{ text: body.systemInstruction }],
      };
    }

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.GEMINI_API_KEY,
      },
      body: JSON.stringify(geminiBody),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error(
        "Gemini Stream API error:",
        geminiResponse.status,
        errorText,
      );
      return new Response(
        JSON.stringify({
          error: "Gemini API request failed",
          status: geminiResponse.status,
          details: errorText,
        }),
        {
          status: geminiResponse.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    // Pipe SSE stream from Gemini back to client with CORS headers
    return new Response(geminiResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...corsHeaders,
      },
    });
  } catch (err) {
    console.error("Worker stream error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}
