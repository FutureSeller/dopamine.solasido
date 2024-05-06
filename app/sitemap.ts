export default async function sitemap() {
  return [
    {
      url: "https://dopamine.solasido.design",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
