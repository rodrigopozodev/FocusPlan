import { StyleSheet } from 'react-native';
import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function CalendarScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerTitle="Calendario">
      <ThemedView style={styles.container}>
        <ThemedText type="title">Calendario</ThemedText>
        <ThemedText>Planificación por bloques horarios</ThemedText>
        
        {/* Aquí irá el componente de calendario */}
        <ThemedView style={styles.calendarContainer}>
          <ThemedText type="subtitle">Mayo de 2024</ThemedText>
          
          {/* Días de la semana */}
          <ThemedView style={styles.weekDaysContainer}>
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
              <ThemedText key={index} style={styles.weekDay}>{day}</ThemedText>
            ))}
          </ThemedView>
          
          {/* Calendario (simplificado) */}
          <ThemedView style={styles.daysContainer}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <ThemedView key={day} style={styles.dayContainer}>
                <ThemedText style={styles.dayText}>{day}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
        
        {/* Bloques de tiempo para el día seleccionado */}
        <ThemedView style={styles.timeBlocksContainer}>
          <ThemedText type="subtitle">Bloques de tiempo</ThemedText>
          
          <ThemedView style={styles.timeBlock}>
            <ThemedText style={styles.timeBlockTitle}>Trabajo</ThemedText>
            <ThemedText style={styles.timeBlockTime}>8:00 - 10:00</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.timeBlock}>
            <ThemedText style={styles.timeBlockTitle}>Tema 1</ThemedText>
            <ThemedText style={styles.timeBlockTime}>10:00 - 12:00</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.timeBlock}>
            <ThemedText style={styles.timeBlockTitle}>Examen</ThemedText>
            <ThemedText style={styles.timeBlockTime}>14:00 - 16:00</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.timeBlock}>
            <ThemedText style={styles.timeBlockTitle}>Descanso</ThemedText>
            <ThemedText style={styles.timeBlockTime}>16:00 - 17:00</ThemedText>
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
  calendarContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
  weekDay: {
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayContainer: {
    width: '14.28%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayText: {
    textAlign: 'center',
  },
  timeBlocksContainer: {
    marginTop: 20,
  },
  timeBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  timeBlockTitle: {
    fontWeight: 'bold',
  },
  timeBlockTime: {
    opacity: 0.7,
  },
});