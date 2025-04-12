import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppContext } from '@/context/AppContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function FinanceScreen() {
  const { transactionsList, addTransaction, deleteTransaction } = useAppContext();

  // Calcular totales
  const totalIncome = transactionsList
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpense = transactionsList
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = totalIncome - totalExpense;
  
  // Función para eliminar una transacción
  const handleDeleteTransaction = (id: string) => {
    Alert.alert(
      "Eliminar transacción",
      "¿Estás seguro de que deseas eliminar esta transacción?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => deleteTransaction(id), style: "destructive" }
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#B9D3E8', dark: '#27394D' }}
      headerTitle="Finanzas">
      <ThemedView style={styles.container}>
        <ThemedText type="title">Finanzas</ThemedText>
        <ThemedText>Registro de ingresos y gastos</ThemedText>
        
        {/* Resumen financiero */}
        <ThemedView style={styles.summaryContainer}>
          <ThemedView style={styles.summaryRow}>
            <ThemedView style={[styles.summaryCard, styles.incomeCard]}>
              <ThemedText style={styles.summaryLabel}>Ingresos</ThemedText>
              <ThemedText style={[styles.summaryAmount, styles.incomeAmount]}>+{totalIncome} €</ThemedText>
            </ThemedView>
            
            <ThemedView style={[styles.summaryCard, styles.expenseCard]}>
              <ThemedText style={styles.summaryLabel}>Gastos</ThemedText>
              <ThemedText style={[styles.summaryAmount, styles.expenseAmount]}>-{totalExpense} €</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={[styles.summaryCard, styles.balanceCard]}>
            <ThemedText style={styles.summaryLabel}>Balance</ThemedText>
            <ThemedText 
              style={[styles.summaryAmount, balance >= 0 ? styles.incomeAmount : styles.expenseAmount]}
            >
              {balance >= 0 ? '+' : ''}{balance} €
            </ThemedText>
          </ThemedView>
        </ThemedView>
        
        {/* Transacciones recientes */}
        <ThemedView style={styles.transactionsContainer}>
          <ThemedText type="subtitle">Transacciones recientes</ThemedText>
          
          {transactionsList.map((transaction) => (
            <ThemedView key={transaction.id} style={styles.transactionItem}>
              <ThemedView style={styles.transactionDetails}>
                <ThemedText style={styles.transactionDescription}>{transaction.description}</ThemedText>
                <ThemedText style={styles.transactionDate}>{transaction.date}</ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.transactionActions}>
                <ThemedText 
                  style={[styles.transactionAmount, transaction.type === 'income' ? styles.incomeText : styles.expenseText]}
                >
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount} €
                </ThemedText>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTransaction(transaction.id)}
                >
                  <IconSymbol size={18} name="trash" color="#FF6B6B" />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
        
        {/* Gráfico de evolución */}
        <ThemedView style={styles.chartContainer}>
          <ThemedText type="subtitle">Evolución mensual</ThemedText>
          
          <ThemedView style={styles.chartPlaceholder}>
            {/* Aquí iría un componente de gráfico real */}
            <ThemedView style={styles.barContainer}>
              <ThemedView style={[styles.barChart, styles.incomeBar, { height: 100 }]} />
              <ThemedView style={[styles.barChart, styles.expenseBar, { height: 70 }]} />
              <ThemedText style={styles.barLabel}>Mar</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.barContainer}>
              <ThemedView style={[styles.barChart, styles.incomeBar, { height: 120 }]} />
              <ThemedView style={[styles.barChart, styles.expenseBar, { height: 90 }]} />
              <ThemedText style={styles.barLabel}>Abr</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.barContainer}>
              <ThemedView style={[styles.barChart, styles.incomeBar, { height: 150 }]} />
              <ThemedView style={[styles.barChart, styles.expenseBar, { height: 80 }]} />
              <ThemedText style={styles.barLabel}>May</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flex: 1,
  },
  incomeCard: {
    backgroundColor: 'rgba(0, 200, 83, 0.1)',
    marginRight: 5,
  },
  expenseCard: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    marginLeft: 5,
  },
  balanceCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#00C853',
  },
  expenseAmount: {
    color: '#FF5252',
  },
  transactionsContainer: {
    marginTop: 30,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
  },
  transactionDate: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeText: {
    color: '#00C853',
  },
  expenseText: {
    color: '#FF5252',
  },
  chartContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 200,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    width: 60,
  },
  barChart: {
    width: 20,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  incomeBar: {
    backgroundColor: '#00C853',
  },
  expenseBar: {
    backgroundColor: '#FF5252',
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    opacity: 0.7,
  },
});