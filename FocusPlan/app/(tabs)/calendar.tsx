import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppContext } from '@/context/AppContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function CalendarScreen() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppContext();
  const [selectedDate, setSelectedDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '08:00',
    endTime: '09:00',
    date: '',
    color: '#4285F4'
  });
  
  // Obtener el mes y año actual
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Nombres de los meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Obtener el primer día del mes y el número de días
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Ajustar el primer día para que la semana comience en lunes (0 = lunes, 6 = domingo)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Crear un array con los días del mes
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Función para formatear la fecha seleccionada
  const formatSelectedDate = (day: number) => {
    const month = currentMonth + 1;
    return `${currentYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };
  
  // Filtrar eventos para la fecha seleccionada
  const selectedDateEvents = events.filter(event => event.date === selectedDate);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<ThemedText style={styles.headerTitle}>Calendario</ThemedText>}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Calendario</ThemedText>
        <ThemedText>Planificación por bloques horarios</ThemedText>
        
        {/* Componente de calendario */}
        <ThemedView style={styles.calendarContainer}>
          <ThemedView style={styles.calendarHeader}>
            <ThemedText type="subtitle">{monthNames[currentMonth]} de {currentYear}</ThemedText>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => {
                if (selectedDate) {
                  setShowAddForm(!showAddForm);
                  setNewEvent({...newEvent, date: selectedDate});
                } else {
                  Alert.alert("Selecciona una fecha", "Por favor, selecciona primero una fecha en el calendario.");
                }
              }}
            >
              <IconSymbol size={24} name={showAddForm ? "minus" : "plus"} color="#0a7ea4" />
            </TouchableOpacity>
          </ThemedView>
          
          {/* Días de la semana */}
          <ThemedView style={styles.weekDaysContainer}>
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
              <ThemedText key={index} style={styles.weekDay}>{day}</ThemedText>
            ))}
          </ThemedView>
          
          {/* Calendario */}
          <ThemedView style={styles.daysContainer}>
            {/* Espacios vacíos para alinear el primer día */}
            {Array.from({ length: adjustedFirstDay }, (_, i) => (
              <ThemedView key={`empty-${i}`} style={styles.emptyDay} />
            ))}
            
            {/* Días del mes */}
            {daysArray.map((day) => {
              const dateString = formatSelectedDate(day);
              const hasEvents = events.some(event => event.date === dateString);
              const isSelected = dateString === selectedDate;
              
              return (
                <TouchableOpacity 
                  key={day} 
                  style={[styles.dayContainer, isSelected && styles.selectedDay]}
                  onPress={() => {
                    setSelectedDate(dateString);
                    setShowAddForm(false);
                  }}
                >
                  <ThemedText style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</ThemedText>
                  {hasEvents && <ThemedView style={styles.eventIndicator} />}
                </TouchableOpacity>
              );
            })}
          </ThemedView>
        </ThemedView>
        
        {/* Formulario para añadir evento */}
        {showAddForm && (
          <ThemedView style={styles.addFormContainer}>
            <TextInput
              style={styles.input}
              placeholder="Título del evento"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({...newEvent, title: text})}
            />
            <ThemedView style={styles.formRow}>
              <ThemedView style={styles.formGroup}>
                <ThemedText style={styles.formLabel}>Hora inicio</ThemedText>
                <TextInput
                  style={styles.timeInput}
                  placeholder="HH:MM"
                  value={newEvent.startTime}
                  onChangeText={(text) => setNewEvent({...newEvent, startTime: text})}
                />
              </ThemedView>
              <ThemedView style={styles.formGroup}>
                <ThemedText style={styles.formLabel}>Hora fin</ThemedText>
                <TextInput
                  style={styles.timeInput}
                  placeholder="HH:MM"
                  value={newEvent.endTime}
                  onChangeText={(text) => setNewEvent({...newEvent, endTime: text})}
                />
              </ThemedView>
            </ThemedView>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                if (newEvent.title.trim() && newEvent.date) {
                  addEvent({
                    id: Date.now().toString(),
                    ...newEvent,
                    color: '#4285F4'
                  });
                  setNewEvent({
                    title: '',
                    startTime: '08:00',
                    endTime: '09:00',
                    date: selectedDate,
                    color: '#4285F4'
                  });
                  setShowAddForm(false);
                }
              }}
            >
              <ThemedText style={styles.saveButtonText}>Guardar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        
        {/* Bloques de tiempo para el día seleccionado */}
        <ThemedView style={styles.timeBlocksContainer}>
          <ThemedText type="subtitle">
            {selectedDate ? `Eventos para ${selectedDate.split('-').reverse().join('/')}` : 'Selecciona una fecha'}
          </ThemedText>
          
          {selectedDate && selectedDateEvents.length === 0 && (
            <ThemedText style={styles.noEventsText}>No hay eventos para esta fecha</ThemedText>
          )}
          
          {selectedDateEvents.map((event) => (
            <ThemedView key={event.id} style={[styles.timeBlock, { borderLeftColor: event.color, borderLeftWidth: 4 }]}>
              <ThemedView style={styles.timeBlockContent}>
                <ThemedText style={styles.timeBlockTitle}>{event.title}</ThemedText>
                <ThemedText style={styles.timeBlockTime}>{event.startTime} - {event.endTime}</ThemedText>
              </ThemedView>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    "Eliminar evento",
                    `¿Estás seguro de que deseas eliminar "${event.title}"?`,
                    [
                      { text: "Cancelar", style: "cancel" },
                      { text: "Eliminar", onPress: () => deleteEvent(event.id), style: "destructive" }
                    ]
                  );
                }}
              >
                <IconSymbol size={18} name="trash" color="#FF6B6B" />
              </TouchableOpacity>
            </ThemedView>
          ))}
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  emptyDay: {
    width: '14.28%',
    height: 30,
  },
  selectedDay: {
    backgroundColor: 'rgba(10, 126, 164, 0.2)',
    borderRadius: 15,
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0a7ea4',
    position: 'absolute',
    bottom: 2,
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
  timeInput: {
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
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.6,
  },
  timeBlockContent: {
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
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