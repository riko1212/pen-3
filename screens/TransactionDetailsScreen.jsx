import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TransactionDetailsScreen({ route }) {
  const { transactionId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      {transactionId ? (
        <Text>ID: {transactionId}</Text>
      ) : (
        <Text>No transaction selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
