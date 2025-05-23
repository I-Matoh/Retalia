import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowDownLeft, ArrowUpRight, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/utils/dateUtils';

type SummaryCardProps = {
  income: number;
  expenses: number;
  profit: number;
  period: string;
};

export default function SummaryCard({ income, expenses, profit, period }: SummaryCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{period} Summary</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, styles.incomeIcon]}>
            <ArrowUpRight size={20} color={Colors.success} />
          </View>
          <Text style={styles.statLabel}>Income</Text>
          <Text style={[styles.statValue, styles.incomeText]}>
            {formatCurrency(income)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, styles.expenseIcon]}>
            <ArrowDownLeft size={20} color={Colors.danger} />
          </View>
          <Text style={styles.statLabel}>Expenses</Text>
          <Text style={[styles.statValue, styles.expenseText]}>
            {formatCurrency(expenses)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, styles.profitIcon]}>
            <DollarSign size={20} color={Colors.primary} />
          </View>
          <Text style={styles.statLabel}>Profit</Text>
          <Text 
            style={[
              styles.statValue, 
              profit >= 0 ? styles.incomeText : styles.expenseText
            ]}
          >
            {formatCurrency(profit)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  incomeIcon: {
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
  },
  expenseIcon: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
  },
  profitIcon: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeText: {
    color: Colors.success,
  },
  expenseText: {
    color: Colors.danger,
  },
});