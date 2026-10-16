import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.toString().replace(/\/+$/, '') : 'https://dog-age.sandovaldavid.com';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/"/>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/es/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/"/>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>
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
