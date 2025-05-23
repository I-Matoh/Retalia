import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTransactionStore } from '@/store/transactionStore';
import { calculateTotals, calculateProfit, filterTransactionsByPeriod, groupTransactionsByDate } from '@/utils/transactionUtils';
import { formatCurrency } from '@/utils/dateUtils';
import PeriodSelector from '@/components/PeriodSelector';
import TransactionItem from '@/components/TransactionItem';
import EmptyState from '@/components/EmptyState';
import ProfitChart from '@/components/ProfitChart';
import Colors from '@/constants/colors';

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const { transactions } = useTransactionStore();
  
  const filteredTransactions = filterTransactionsByPeriod(transactions, selectedPeriod);
  const { income, expenses } = calculateTotals(filteredTransactions);
  const profit = calculateProfit(filteredTransactions);
  const groupedTransactions = groupTransactionsByDate(filteredTransactions);
  
  if (transactions.length === 0) {
    return (
      <EmptyState 
        title="No data to analyze" 
        message="Add some transactions to see your business reports and analytics." 
      />
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Business Analytics</Text>
      
      <PeriodSelector 
        selectedPeriod={selectedPeriod} 
        onSelectPeriod={setSelectedPeriod} 
      />
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={[styles.summaryValue, styles.incomeText]}>
            {formatCurrency(income)}
          </Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={[styles.summaryValue, styles.expenseText]}>
            {formatCurrency(expenses)}
          </Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Profit</Text>
          <Text 
            style={[
              styles.summaryValue, 
              profit >= 0 ? styles.incomeText : styles.expenseText
            ]}
          >
            {formatCurrency(profit)}
          </Text>
        </View>
      </View>
      
      <ProfitChart 
        transactions={filteredTransactions} 
        period={selectedPeriod} 
      />
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {filteredTransactions.filter(t => t.type === 'income').length}
          </Text>
          <Text style={styles.statLabel}>Income Transactions</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {filteredTransactions.filter(t => t.type === 'expense').length}
          </Text>
          <Text style={styles.statLabel}>Expense Transactions</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Transaction History</Text>
      
      {groupedTransactions.length > 0 ? (
        groupedTransactions.map((group) => (
          <View key={group.date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{new Date(group.date).toLocaleDateString()}</Text>
            {group.transactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No transactions for this period</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeText: {
    color: Colors.success,
  },
  expenseText: {
    color: Colors.danger,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
  },
});