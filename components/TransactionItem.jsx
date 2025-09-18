import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

function TransactionItem({ type, sum, date }) {
  return (
    <Animated.View
      style={styles.item}
      entering={FadeInUp.duration(400)} // анімація входу
    >
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.sum}>${sum}</Text>
      <Text style={styles.date}>{date}</Text>
    </Animated.View>
  );
}

export default React.memo(TransactionItem);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    marginBottom: 8,
  },
  type: { fontSize: 14, fontWeight: '600' },
  sum: { fontSize: 14, color: 'green' },
  date: { fontSize: 12, color: '#555' },
});
