// Ensiklopedia semua tag HTML — diisi bertahap per batch (Task 3–5).
// Skema entri:
// {
//   slug, tag, name, category, level ('Pemula' | 'Menengah'),
//   summary, atribut: [{ name, desc }], contohKode,
//   related: [slug], demo, deprecated?, replacedBy?
// }

export const REQUIRED_FIELDS = [
  "slug",
  "tag",
  "name",
  "category",
  "level",
  "summary",
  "atribut",
  "contohKode",
  "related",
  "demo",
];

export const TAGS = [];
