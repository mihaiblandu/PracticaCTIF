import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { LocationCard } from '@/components/common/LocationCard';
import { colors, spacing, typography } from '@/constants/theme';

import { locations } from '@/data/mockData';

export default function LocationsScreen() {
  const handleLocationPress = (locationId: string) => {
    console.log(`Location pressed: ${locationId}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Locations" subtitle="Find a BrewBean Café near you" />
      
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LocationCard 
            location={item} 
            onPress={() => handleLocationPress(item.id)} 
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  listContent: {
    padding: spacing.md,
  },
});