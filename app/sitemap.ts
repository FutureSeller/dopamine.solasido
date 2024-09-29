export default async function sitemap() {
  return [
    {
      url: 'https://dopamine.solasido.world',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
