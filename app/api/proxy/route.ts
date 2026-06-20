import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url');
  if (!target) return new NextResponse('Missing url param', { status: 400 });

  let targetUrl: URL;
  try {
    targetUrl = new URL(target);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  // Only allow http/https
  if (!['http:', 'https:'].includes(targetUrl.protocol)) {
    return new NextResponse('Protocol not allowed', { status: 403 });
  }

  try {
    const upstream = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });

    const contentType = upstream.headers.get('content-type') ?? 'text/html';

    // For non-HTML responses (images, fonts, CSS, JS) — stream them as-is
    if (!contentType.includes('text/html')) {
      const body = await upstream.arrayBuffer();
      return new NextResponse(body, {
        status: upstream.status,
        headers: { 'Content-Type': contentType },
      });
    }

    let html = await upstream.text();

    // Inject <base> so relative URLs (images, scripts, CSS) resolve against the original origin
    const base = `${targetUrl.origin}`;
    const baseTag = `<base href="${base}/">`;
    if (/<head[\s>]/i.test(html)) {
      html = html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`);
    } else {
      html = baseTag + html;
    }

    return new NextResponse(html, {
      status: upstream.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Intentionally omit X-Frame-Options and CSP so the iframe can load it
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[proxy]', err);
    return new NextResponse('Proxy fetch failed', { status: 502 });
  }
}
