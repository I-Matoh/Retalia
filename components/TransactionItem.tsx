import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { formatCurrency, formatDate } from '@/utils/dateUtils';
import { getCategory } from '@/constants/categories';
import Colors from '@/constants/colors';
import { Transaction } from '@/types/transaction';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';

type TransactionItemProps = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const router = useRouter();
  const category = getCategory(transaction.categoryId);
  
  const handlePress = () => {
    router.push(`/transaction/${transaction.id}`);
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {transaction.type === 'income' ? (
          <ArrowUpRight 
            size={24} 
            color={Colors.success} 
            style={styles.icon} 
          />
        ) : (
          <ArrowDownLeft 
            size={24} 
            color={Colors.danger} 
            style={styles.icon} 
          />
        )}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description}
        </Text>
        <Text style={styles.category}>{category.name}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text 
          style={[
            styles.amount, 
            transaction.type === 'income' ? styles.income : styles.expense
          ]}
        >
          {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
        </Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: Colors.textLight,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  income: {
    color: Colors.success,
  },
  expense: {
    color: Colors.danger,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
});