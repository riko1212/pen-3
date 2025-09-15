// api.js
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
// Можеш підставити інший API для транзакцій

export const fetchTransactions = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Помилка завантаження');
    return response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
