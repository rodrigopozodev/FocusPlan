import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppContext } from '@/context/AppContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function GoalsScreen() {
  const { goalsList, toggleGoalCompletion, addGoal, deleteGoal } = useAppContext();
  const [newGoalText, setNewGoalText] = useState('');

  // Define una imagen para el encabezado
  const headerImage = <Image source={require('@/assets/headerImage.jpg')} style={{ width: '100%', height: 250 }} />;

  return (
    <ParallaxScrollView
      headerImage={headerImage}  // Pasamos la imagen al componente ParallaxScrollView
      headerBackgroundColor={{ light: '#E8D3B9', dark: '#4D3B27' }}
      headerTitle="Objetivos"
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Objetivos</ThemedText>
        <ThemedText>Lista de objetivos diarios</ThemedText>
        
        <ThemedView style={styles.todayContainer}>
          <ThemedText type="subtitle">Hoy</ThemedText>
          
          {/* Formulario para añadir nuevo objetivo */}
          <ThemedView style={styles.addGoalForm}>
            <TextInput
              style={styles.input}
              placeholder="Añadir nuevo objetivo..."
              value={newGoalText}
              onChangeText={setNewGoalText}
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => {
                if (newGoalText.trim()) {
                  addGoal(newGoalText.trim());
                  setNewGoalText('');
                }
              }}
            >
              <IconSymbol size={24} name="plus" color="#0a7ea4" />
            </TouchableOpacity>
          </ThemedView>
          
          {/* Lista de objetivos */}
          <ThemedView style={styles.goalsList}>
            {goalsList.map((goal) => (
              <ThemedView key={goal.id} style={styles.goalItem}>
                <TouchableOpacity 
                  style={[styles.checkbox, goal.completed && styles.checkboxChecked]}
                  onPress={() => toggleGoalCompletion(goal.id)}
                >
                  {goal.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
                </TouchableOpacity>
                <ThemedText 
                  style={[styles.goalText, goal.completed && styles.goalTextCompleted]}
                >
                  {goal.text}
                </ThemedText>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteGoal(goal.id)}
                >
                  <IconSymbol size={18} name="trash" color="#FF6B6B" />
                </TouchableOpacity>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
        
        {/* Resumen de cumplimiento */}
        <ThemedView style={styles.summaryContainer}>
          <ThemedText type="subtitle">Resumen de cumplimiento</ThemedText>
          
          <ThemedView style={styles.progressContainer}>
            <ThemedView style={styles.progressBar}>
              <ThemedView 
                style={[styles.progressFill, { width: `${goalsList.length > 0 ? (goalsList.filter(g => g.completed).length / goalsList.length) * 100 : 0}%` }]}
              />
            </ThemedView>
            <ThemedText style={styles.progressText}>
              {goalsList.filter(g => g.completed).length} de {goalsList.length} completados
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  addGoalForm: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  deleteButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  todayContainer: {
    marginTop: 20,
  },
  goalsList: {
    marginTop: 10,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0a7ea4',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 16,
    flex: 1,
  },
  goalTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  summaryContainer: {
    marginTop: 30,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0a7ea4',
    borderRadius: 5,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
  },
});
