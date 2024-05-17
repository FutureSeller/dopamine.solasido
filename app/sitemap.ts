export default async function sitemap() {
  return [
    {
      url: "https://dopamine.solasido.design",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
