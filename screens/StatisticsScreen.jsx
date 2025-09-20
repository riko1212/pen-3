import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { VictoryPie } from 'victory-native';

export default function StatisticsScreen() {
  const transactions = useSelector((state) => state.transactions.items);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const selectedMonth = dayjs(selectedDate).format('MM');
  const selectedYear = dayjs(selectedDate).format('YYYY');

  // Безпечний фільтр, якщо transactions undefined
  const filteredTx = (transactions || []).filter((tx) => {
    if (!tx.date) return false;
    const txMonth = dayjs(tx.date).format('MM');
    const txYear = dayjs(tx.date).format('YYYY');
    return txMonth === selectedMonth && txYear === selectedYear;
  });

  const grouped = filteredTx.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + Number(tx.sum);
    return acc;
  }, {});

  const data = Object.keys(grouped).map((key) => ({
    x: key,
    y: grouped[key],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Витрати по категоріях</Text>
      <Text style={styles.subtitle}>
        {dayjs(selectedDate).format('MMMM YYYY')}
      </Text>

      <Button
        title="📅 Обрати місяць"
        onPress={() => setShowPicker(true)}
        color="#1C1C28"
      />

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      {data.length > 0 ? (
        <>
          <VictoryPie
            data={data}
            colorScale={colors}
            height={220}
            style={{
              labels: { fontSize: 14, fill: '#333' },
            }}
          />

          <FlatList
            data={Object.entries(grouped)}
            keyExtractor={([cat]) => cat}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.category}>{item[0]}</Text>
                <Text style={styles.amount}>{item[1].toFixed(2)} грн</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.empty}>Немає транзакцій за цей місяць</Text>
      )}
    </View>
  );
}

const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6A4C93', '#1A535C'];

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  category: { fontSize: 16, fontWeight: '600' },
  amount: { fontSize: 16, color: '#333' },
  empty: { marginTop: 30, textAlign: 'center', color: '#888' },
});
