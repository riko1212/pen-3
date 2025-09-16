import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction } from '../redux/transactionsSlice';
import Sidebar from '../components/Sidebar';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import SortMenu from '../components/SortMenu';
import { fetchTransactions } from '../api/api';
import { UserContext } from '../context/UserContext';

export default function TransactionsScreen() {
  const { user } = useContext(UserContext); // отримуємо користувача з Context API
  const transactions = useSelector((state) => state.transactions.list);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState(['Home', 'Food', 'Kids']);
  const [sortOption, setSortOption] = useState('Date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const handleSaveTransaction = (tx) => {
    dispatch(addTransaction(tx));
  };

  // Завантаження з API
  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        const mapped = data.slice(0, 10).map((item, idx) => ({
          id: item.id.toString(),
          type: `Transaction ${idx + 1}`,
          sum: (Math.random() * 100).toFixed(2),
          date: new Date().toISOString().split('T')[0],
        }));
        mapped.forEach((tx) => dispatch(addTransaction(tx)));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOption === 'Date') return b.date.localeCompare(a.date);
    if (sortOption === 'Sum') return Number(b.sum) - Number(a.sum);
    return 0;
  });

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar
          username={user?.username || 'Гість'}
          categories={categories}
          onAddCategory={handleAddCategory}
        />
      </View>

      <View style={styles.main}>
        <TransactionForm onSave={handleSaveTransaction} />

        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <SortMenu options={['Date', 'Sum']} onSelect={setSortOption} />

          {loading && <ActivityIndicator size="large" color="#1C1C28" />}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {!loading && !error && (
            <FlatList
              data={sortedTransactions}
              renderItem={({ item }) => (
                <TransactionItem
                  type={item.type}
                  sum={item.sum}
                  date={item.date}
                />
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No transactions yet</Text>
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F6F6F6' },
  sidebar: { flex: 1 },
  main: { flex: 3, padding: 16 },
  listContainer: { marginTop: 16, flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
  errorText: { textAlign: 'center', color: 'red', marginTop: 20 },
});
