import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { CategorySelector } from '@/components/common/CategorySelector';
import { ProductCard } from '@/components/common/ProductCard';
import { colors, spacing, typography, breakpoints } from '@/constants/theme';

import { products, categories } from '@/data/mockData';

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const numColumns = Platform.OS === 'web' && window.innerWidth > breakpoints.tablet ? 2 : 1;

  return (
    <View style={styles.container}>
      <Header title="Menu" subtitle="Browse our coffee and food offerings" />
      
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.productList}
        numColumns={numColumns}
        key={numColumns.toString()}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  productList: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
});