import { createClient } from "../../utils/supabase/server";

const generateSitemapLink = (url: string) =>
  `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET() {
  const supabase = createClient();
  const { count } = await supabase.from("POST").select("id");
  const postXmls = count
    ? Array.from({ length: Math.ceil(count / 50000) }, (_, i) => ({
        id: i,
      }))
    : [{ id: 0 }];

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generateSitemapLink("https://dopamine.solasido.design/sitemap.xml")}

      ${postXmls
        .map((xmlId) =>
          generateSitemapLink(
            `https://dopamine.solasido.design/post/sitemap/${xmlId.id}.xml`
          )
        )
        .join("")} 
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" },
  });
}
