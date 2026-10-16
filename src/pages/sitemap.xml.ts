import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://sandovaldavid.github.io/dog-age-web/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://sandovaldavid.github.io/dog-age-web/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://sandovaldavid.github.io/dog-age-web/es/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://sandovaldavid.github.io/dog-age-web/"/>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sandovaldavid.github.io/dog-age-web/es/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://sandovaldavid.github.io/dog-age-web/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://sandovaldavid.github.io/dog-age-web/es/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://sandovaldavid.github.io/dog-age-web/"/>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
