import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppContext } from '@/context/AppContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function WorkoutScreen() {
  const { exercisesList, updateExercise, addExercise, deleteExercise } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#C9B9E8', dark: '#3B274D' }}
      headerImage={<ThemedText style={styles.headerTitle}>Entrenamiento</ThemedText>}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Entrenamiento</ThemedText>
        <ThemedText>Registro de ejercicios y marcas personales</ThemedText>
        
        {/* Lista de ejercicios */}
        <ThemedView style={styles.exercisesContainer}>
          <ThemedView style={styles.headerContainer}>
            <ThemedText type="subtitle">Ejercicios de hoy</ThemedText>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddForm(!showAddForm)}
            >
              <IconSymbol size={24} name={showAddForm ? "minus" : "plus"} color="#0a7ea4" />
            </TouchableOpacity>
          </ThemedView>
          
          {/* Formulario para añadir ejercicio */}
          {showAddForm && (
            <ThemedView style={styles.addFormContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del ejercicio"
                value={newExercise.name}
                onChangeText={(text) => setNewExercise({...newExercise, name: text})}
              />
              <ThemedView style={styles.formRow}>
                <ThemedView style={styles.formGroup}>
                  <ThemedText style={styles.formLabel}>Series</ThemedText>
                  <TextInput
                    style={styles.smallInput}
                    keyboardType="numeric"
                    value={newExercise.sets.toString()}
                    onChangeText={(text) => setNewExercise({...newExercise, sets: parseInt(text) || 0})}
                  />
                </ThemedView>
                <ThemedView style={styles.formGroup}>
                  <ThemedText style={styles.formLabel}>Reps</ThemedText>
                  <TextInput
                    style={styles.smallInput}
                    keyboardType="numeric"
                    value={newExercise.reps.toString()}
                    onChangeText={(text) => setNewExercise({...newExercise, reps: parseInt(text) || 0})}
                  />
                </ThemedView>
                <ThemedView style={styles.formGroup}>
                  <ThemedText style={styles.formLabel}>Peso (kg)</ThemedText>
                  <TextInput
                    style={styles.smallInput}
                    keyboardType="numeric"
                    value={newExercise.weight.toString()}
                    onChangeText={(text) => setNewExercise({...newExercise, weight: parseInt(text) || 0})}
                  />
                </ThemedView>
              </ThemedView>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => {
                  if (newExercise.name.trim()) {
                    addExercise({
                      id: Date.now().toString(),
                      ...newExercise
                    });
                    setNewExercise({
                      name: '',
                      sets: 3,
                      reps: 10,
                      weight: 0
                    });
                    setShowAddForm(false);
                  }
                }}
              >
                <ThemedText style={styles.saveButtonText}>Guardar</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
          
          {/* Cabecera de la tabla */}
          <ThemedView style={styles.tableHeader}>
            <ThemedText style={[styles.headerCell, styles.exerciseNameHeader]}>Ejercicio</ThemedText>
            <ThemedText style={styles.headerCell}>Series</ThemedText>
            <ThemedText style={styles.headerCell}>Reps.</ThemedText>
            <ThemedText style={styles.headerCell}>Peso</ThemedText>
          </ThemedView>
          
          {/* Filas de ejercicios */}
          {exercisesList.map((exercise) => (
            <ThemedView key={exercise.id} style={styles.exerciseRow}>
              <ThemedText style={[styles.cell, styles.exerciseName]}>{exercise.name}</ThemedText>
              <ThemedText style={styles.cell}>{exercise.sets}</ThemedText>
              <ThemedText style={styles.cell}>{exercise.reps}</ThemedText>
              <ThemedText style={styles.cell}>{exercise.weight} kg</ThemedText>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    "Eliminar ejercicio",
                    `¿Estás seguro de que deseas eliminar ${exercise.name}?`,
                    [
                      { text: "Cancelar", style: "cancel" },
                      { text: "Eliminar", onPress: () => deleteExercise(exercise.id), style: "destructive" }
                    ]
                  );
                }}
              >
                <IconSymbol size={18} name="trash" color="#FF6B6B" />
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>
        
        {/* Gráfico de progreso */}
        <ThemedView style={styles.progressContainer}>
          <ThemedText type="subtitle">Progreso</ThemedText>
          
          <ThemedView style={styles.progressChart}>
            {/* Aquí iría un componente de gráfico real */}
            <ThemedView style={styles.chartPlaceholder}>
              <ThemedView style={styles.chartLine} />
              <ThemedView style={[styles.chartDot, { bottom: '20%', left: '10%' }]} />
              <ThemedView style={[styles.chartDot, { bottom: '30%', left: '30%' }]} />
              <ThemedView style={[styles.chartDot, { bottom: '50%', left: '50%' }]} />
              <ThemedView style={[styles.chartDot, { bottom: '45%', left: '70%' }]} />
              <ThemedView style={[styles.chartDot, { bottom: '60%', left: '90%' }]} />
            </ThemedView>
            
            <ThemedView style={styles.chartLabels}>
              <ThemedText style={styles.chartLabel}>Abr</ThemedText>
              <ThemedText style={styles.chartLabel}>May</ThemedText>
              <ThemedText style={styles.chartLabel}>Jun</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.personalRecords}>
            <ThemedText style={styles.recordTitle}>Marcas personales:</ThemedText>
            <ThemedText style={styles.recordItem}>Press de banca: 80 kg</ThemedText>
            <ThemedText style={styles.recordItem}>Sentadillas: 100 kg</ThemedText>
            <ThemedText style={styles.recordItem}>Peso muerto: 120 kg</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
      },
      

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  deleteButton: {
    padding: 8,
  },
  addFormContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  smallInput: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  exercisesContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  exerciseNameHeader: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 10,
  },
  exerciseRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  exerciseName: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 10,
  },
  progressContainer: {
    marginTop: 30,
  },
  progressChart: {
    marginTop: 15,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    position: 'relative',
  },
  chartLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#0a7ea4',
    width: '80%',
    bottom: '45%',
    left: '10%',
    borderRadius: 1,
  },
  chartDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#0a7ea4',
    borderRadius: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    marginTop: 5,
  },
  chartLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  personalRecords: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  recordTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordItem: {
    marginBottom: 5,
  },
});