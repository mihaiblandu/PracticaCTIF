import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/common/Header';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { PromotionSection } from '@/components/home/PromotionSection';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';

import { products, promotions } from '@/data/mockData';

export default function HomeScreen() {
  const featuredProducts = products.filter(p => p.featured);
  const newProducts = products.filter(p => p.new);
  const popularProducts = products.filter(p => p.popular);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Hero Banner */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Fresh Beans, Perfect Brew</Text>
              <Text style={styles.heroSubtitle}>
                Handcrafted coffee made with premium, ethically-sourced beans
              </Text>
              <Button
                title="Order Now"
                onPress={() => {}}
                variant="primary"
                size="medium"
                style={styles.heroButton}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Rewards Status */}
        <View style={styles.rewardsContainer}>
          <View style={styles.rewardsInfo}>
            <Text style={styles.rewardsTitle}>Rewards</Text>
            <Text style={styles.rewardsPoints}>350 points</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: '70%' }]} />
            </View>
            <Text style={styles.progressText}>150 points until your next reward</Text>
          </View>
          <Button
            title="View Rewards"
            onPress={() => {}}
            variant="outline"
            size="small"
          />
        </View>

        {/* Promotions */}
        <PromotionSection promotions={promotions} />

        {/* Featured Products */}
        <FeaturedSection
          title="Featured Drinks"
          description="Our baristas' top selections this season"
          products={featuredProducts}
          onViewAllPress={() => {}}
        />

        {/* New Products */}
        <FeaturedSection
          title="New Arrivals"
          description="Fresh additions to our menu"
          products={newProducts}
          onViewAllPress={() => {}}
        />

        {/* Popular Products */}
        <FeaturedSection
          title="Most Popular"
          description="Customer favorites you'll love"
          products={popularProducts}
          onViewAllPress={() => {}}
        />

      </ScrollView>
    </View>
  );
}


// const App = () => {
//   const [data, setData] = useState<string | null>(null);
//
//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/data', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//
//       const result = await response.json();
//
//       setData(JSON.stringify(result));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>{data ? data : "No Data Available"}</Text>
//     </View>
//   );
//
// };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  heroContainer: {
    height: 400,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: spacing.lg,
  },
  heroTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.inverse,
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  heroButton: {
    alignSelf: 'flex-start',
  },
  rewardsContainer: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
  },
  rewardsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rewardsTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  rewardsPoints: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.accent.main,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBackground: {
    height: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.main,
    borderRadius: 4,
  },
  progressText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
});