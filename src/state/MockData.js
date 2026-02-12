export const MOCK_USER = {
  username: 'admin',
  email: 'admin@example.com',
};

export const CATEGORIES = [
  { key: 'shoes', label: 'Shoes', message: 'Welcome to Shoes section.', itemCount: 12 },
  { key: 'clothes', label: 'Clothes', message: 'Welcome to Clothes section.', itemCount: 8 },
  { key: 'accessories', label: 'Accessories', message: 'Welcome to Accessories section.', itemCount: 5 },
];

export function getCategoryByKey(key) {
  return CATEGORIES.find((c) => c.key === key) ?? null;
}
