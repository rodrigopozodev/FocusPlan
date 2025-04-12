import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from '@/context/AppContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function DashboardScreen() {
  const { 
    events, 
    goalsList, 
    mealsList, 
    exercisesList, 
    transactionsList,
    getRandomQuote 
  } = useAppContext();
  
  // Calcular el progreso de los objetivos
  const completedGoals = goalsList.filter(goal => goal.completed).length;
  const totalGoals = goalsList.length;
  const goalProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  
  // Obtener eventos de hoy
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todayEvents = events.filter(event => event.date === formattedToday);
  
  // Obtener la próxima comida
  const nextMeal = mealsList.length > 0 ? mealsList[1] : null; // Almuerzo como ejemplo
  
  // Calcular totales financieros
  const totalIncome = transactionsList
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpense = transactionsList
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = totalIncome - totalExpense;
  
  // Obtener una frase motivacional aleatoria
  const motivationalQuote = getRandomQuote();
  
  // Define una imagen para el encabezado
  const headerImage = <Image source={require('@/assets/headerImage.jpg')} style={{ width: '100%', height: 250 }} />;
  
  return (
    <ParallaxScrollView
      headerImage={headerImage}  // Pasamos la imagen al componente ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerTitle="Dashboard">
      <ThemedView style={styles.container}>
        <ThemedText type="title">FocusPlan</ThemedText>
        <ThemedText>Tu asistente de productividad personal</ThemedText>
        
        {/* Resumen del día */}
        <ThemedView style={styles.todaySummaryContainer}>
          <ThemedText type="subtitle">Resumen del día</ThemedText>
          
          {/* Calendario */}
          <ThemedView style={styles.moduleCard}>
            <ThemedText style={styles.moduleTitle}>Calendario</ThemedText>
            {todayEvents.length > 0 ? (
              todayEvents.map(event => (
                <ThemedView key={event.id} style={styles.moduleContent}>
                  <ThemedText style={styles.eventTime}>{event.startTime} - {event.endTime}</ThemedText>
                  <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                </ThemedView>
              ))
            ) : (
              <ThemedView style={styles.moduleContent}>
                <ThemedText style={styles.eventTitle}>No hay eventos para hoy</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
          
          {/* Objetivos */}
          <ThemedView style={styles.moduleCard}>
            <ThemedText style={styles.moduleTitle}>Objetivos</ThemedText>
            <ThemedView style={styles.moduleContent}>
              <ThemedText style={styles.goalText}>
                {completedGoals > 0 ? `${goalsList[0].text} (${completedGoals}/${totalGoals})` : 'Sin objetivos completados'}
              </ThemedText>
              <ThemedView style={styles.progressBar}>
                <ThemedView style={[styles.progressFill, { width: `${goalProgress}%` }]} />
              </ThemedView>
            </ThemedView>
          </ThemedView>
          
          {/* Nutrición */}
          <ThemedView style={styles.moduleCard}>
            <ThemedText style={styles.moduleTitle}>Nutrición</ThemedText>
            <ThemedView style={styles.moduleContent}>
              <ThemedText style={styles.nutritionText}>Próxima comida: {nextMeal ? nextMeal.title : 'No planificada'}</ThemedText>
              {nextMeal && (
                <ThemedText style={styles.nutritionSubtext}>
                  {nextMeal.items.map(item => item.name).join(', ')}
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>
          
          {/* Entrenamiento */}
          <ThemedView style={styles.moduleCard}>
            <ThemedText style={styles.moduleTitle}>Entrenamiento</ThemedText>
            <ThemedView style={styles.moduleContent}>
              <ThemedText style={styles.workoutText}>Hoy: Entrenamiento de fuerza</ThemedText>
              <ThemedText style={styles.workoutSubtext}>{exercisesList.length} ejercicios programados</ThemedText>
            </ThemedView>
          </ThemedView>
          
          {/* Finanzas */}
          <ThemedView style={styles.moduleCard}>
            <ThemedText style={styles.moduleTitle}>Finanzas</ThemedText>
            <ThemedView style={styles.moduleContent}>
              <ThemedText style={styles.financeText}>Balance del día: {balance >= 0 ? '+' : ''}{balance}€</ThemedText>
              <ThemedText style={styles.financeSubtext}>Ingresos: +{totalIncome}€ | Gastos: -{totalExpense}€</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        {/* Mensaje motivacional */}
        <ThemedView style={styles.motivationalContainer}>
          <ThemedText style={styles.motivationalText}>
            "{motivationalQuote.quote}"
          </ThemedText>
          <ThemedText style={styles.motivationalAuthor}>- {motivationalQuote.author}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  todaySummaryContainer: {
    marginTop: 16,
    gap: 12,
  },
  moduleCard: {
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  moduleContent: {
    marginVertical: 4,
  },
  eventTime: {
    fontSize: 14,
    opacity: 0.7,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalText: {
    fontSize: 16,
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  nutritionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  nutritionSubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
  workoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  workoutSubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
  financeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  financeSubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
  motivationalContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
  },
  motivationalText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  motivationalAuthor: {
    fontSize: 14,
    opacity: 0.7,
  },
});
