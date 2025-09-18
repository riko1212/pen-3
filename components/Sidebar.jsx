import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CategoryItem from './CategoryItem';

function Sidebar({ username, categories, onAddCategory }) {
  // стабільна функція, щоб не створювалась заново на кожен ререндер
  const renderItem = useCallback(
    ({ item }) => (
      <CategoryItem title={item} onAdd={() => onAddCategory(item)} />
    ),
    [onAddCategory]
  );

  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>PennyWise</Text>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
}

export default React.memo(Sidebar); // мемоізація всього компонента

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#1C1C28',
    flex: 1,
    padding: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  welcome: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 16,
  },
});
