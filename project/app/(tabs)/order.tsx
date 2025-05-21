import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { Product } from '@/types/types';
import { Minus, Plus, Clock, MapPin } from 'lucide-react-native';

import { products, locations } from '@/data/mockData';

type CartItem = {
  product: Product;
  quantity: number;
  options: {
    optionId: string;
    choiceId: string;
  }[];
};

export default function OrderScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: products[1], // Cappuccino
      quantity: 1,
      options: [
        { optionId: 'opt-size', choiceId: 'medium' },
        { optionId: 'opt-milk', choiceId: 'oat' },
      ],
    },
    {
      product: products[5], // Almond Croissant
      quantity: 2,
      options: [],
    },
  ]);
  
  const selectedLocation = locations[0]; // Downtown location

  const calculateItemPrice = (item: CartItem) => {
    let price = item.product.price;
    
    item.options.forEach(option => {
      const productOption = item.product.options?.find(opt => opt.id === option.optionId);
      if (productOption) {
        const choice = productOption.choices.find(c => c.id === option.choiceId);
        if (choice) {
          price += choice.priceAdjustment;
        }
      }
    });
    
    return price * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setCartItems(updatedItems);
    } else {
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
    }
  };

  const renderOptionDetails = (item: CartItem) => {
    return item.options.map(option => {
      const productOption = item.product.options?.find(opt => opt.id === option.optionId);
      if (productOption) {
        const choice = productOption.choices.find(c => c.id === option.choiceId);
        if (choice) {
          return (
            <Text key={option.optionId} style={styles.itemOption}>
              {productOption.name}: {choice.name}
              {choice.priceAdjustment > 0 && ` (+$${choice.priceAdjustment.toFixed(2)})`}
            </Text>
          );
        }
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Your Order" />
      
      <ScrollView style={styles.content}>
        {/* Pickup Location */}
        <Card style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Text style={styles.sectionTitle}>Pickup Location</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.locationDetails}>
            <MapPin size={16} color={colors.text.secondary} style={styles.locationIcon} />
            <View>
              <Text style={styles.locationName}>{selectedLocation.name}</Text>
              <Text style={styles.locationAddress}>
                {selectedLocation.address}, {selectedLocation.city}
              </Text>
            </View>
          </View>
        </Card>
        
        {/* Pickup Time */}
        <Card style={styles.pickupCard}>
          <View style={styles.pickupHeader}>
            <Text style={styles.sectionTitle}>Pickup Time</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.pickupDetails}>
            <Clock size={16} color={colors.text.secondary} style={styles.locationIcon} />
            <Text style={styles.pickupTime}>As soon as possible (15-20 min)</Text>
          </View>
        </Card>
        
        {/* Order Items */}
        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {cartItems.map((item, index) => (
            <Card key={`${item.product.id}-${index}`} style={styles.itemCard}>
              <View style={styles.itemRow}>
                <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  {renderOptionDetails(item)}
                  <Text style={styles.itemPrice}>
                    ${calculateItemPrice(item).toFixed(2)}
                  </Text>
                </View>
                
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleDecreaseQuantity(index)}
                  >
                    <Minus size={16} color={colors.text.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleIncreaseQuantity(index)}
                  >
                    <Plus size={16} color={colors.text.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
          
          <TouchableOpacity style={styles.addMoreButton}>
            <Text style={styles.addMoreText}>+ Add More Items</Text>
          </TouchableOpacity>
        </View>
        
        {/* Order Summary */}
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${calculateTax().toFixed(2)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
        </Card>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Place Order"
          variant="primary"
          size="large"
          onPress={() => {}}
          style={styles.checkoutButton}
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
  content: {
    flex: 1,
  },
  locationCard: {
    margin: spacing.md,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  changeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.accent.main,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: spacing.sm,
  },
  locationName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  locationAddress: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  pickupCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  pickupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  pickupDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupTime: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  itemsContainer: {
    margin: spacing.md,
  },
  itemCard: {
    marginVertical: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.sm,
  },
  itemDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  itemOption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: 2,
  },
  itemPrice: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginHorizontal: spacing.sm,
  },
  addMoreButton: {
    alignItems: 'center',
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  addMoreText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.accent.main,
  },
  summaryCard: {
    margin: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  summaryLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  totalValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.primary.main,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  checkoutButton: {
    width: '100%',
  },
});