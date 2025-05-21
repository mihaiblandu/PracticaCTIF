import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { ProductOption, ProductChoice } from '@/types/types';
import { Heart, Minus, Plus } from 'lucide-react-native';

import { products } from '@/data/mockData';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text>Product not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }
  
  // Set default selections for each option
  React.useEffect(() => {
    const defaults: Record<string, string> = {};
    
    product.options?.forEach(option => {
      if (option.choices.length > 0) {
        defaults[option.id] = option.choices[0].id;
      }
    });
    
    setSelectedOptions(defaults);
  }, [product]);
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleOptionSelect = (optionId: string, choiceId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionId]: choiceId,
    });
  };
  
  const calculateTotalPrice = () => {
    let total = product.price;
    
    // Add price adjustments from selected options
    Object.entries(selectedOptions).forEach(([optionId, choiceId]) => {
      const option = product.options?.find(opt => opt.id === optionId);
      if (option) {
        const choice = option.choices.find(c => c.id === choiceId);
        if (choice) {
          total += choice.priceAdjustment;
        }
      }
    });
    
    return total * quantity;
  };
  
  const renderOptionChoices = (option: ProductOption) => {
    return (
      <View key={option.id} style={styles.optionContainer}>
        <Text style={styles.optionTitle}>{option.name}</Text>
        <View style={styles.choicesContainer}>
          {option.choices.map(choice => (
            <TouchableOpacity
              key={choice.id}
              style={[
                styles.choiceButton,
                selectedOptions[option.id] === choice.id && styles.selectedChoice,
              ]}
              onPress={() => handleOptionSelect(option.id, choice.id)}
            >
              <Text
                style={[
                  styles.choiceText,
                  selectedOptions[option.id] === choice.id && styles.selectedChoiceText,
                ]}
              >
                {choice.name}
                {choice.priceAdjustment > 0 && ` (+$${choice.priceAdjustment.toFixed(2)})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        {/* Product Information */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                size={24}
                color={isFavorite ? colors.util.error : colors.text.secondary}
                fill={isFavorite ? colors.util.error : 'none'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Product Options */}
          {product.options && product.options.length > 0 && (
            <Card style={styles.optionsCard}>
              {product.options.map(option => renderOptionChoices(option))}
            </Card>
          )}

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}
              >
                <Minus size={20} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}
              >
                <Plus size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer with Add to Order Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${calculateTotalPrice().toFixed(2)}</Text>
        </View>
        <Button
          title="Add to Order"
          variant="primary"
          size="large"
          onPress={() => {
            // Add to cart logic
            router.back();
          }}
          style={styles.addButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  price: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.accent.main,
  },
  favoriteButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  optionsCard: {
    marginBottom: spacing.xl,
  },
  optionContainer: {
    marginBottom: spacing.lg,
  },
  optionTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  choiceButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedChoice: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  choiceText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  selectedChoiceText: {
    color: colors.text.inverse,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  quantityLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  quantityValue: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  totalPrice: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  addButton: {
    flex: 2,
  },
});