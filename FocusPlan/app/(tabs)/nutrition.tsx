import { StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppContext } from '@/context/AppContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function NutritionScreen() {
  const { mealsList, toggleMealItemCompletion, addMealItem, deleteMealItem } = useAppContext();
  const [newItemText, setNewItemText] = useState('');
  const [selectedMealTitle, setSelectedMealTitle] = useState('');

  // Imagen para el encabezado
  const headerImage = <Image source={require('@/assets/headerImage.jpg')} style={{ width: '100%', height: 250 }} />;

  return (
    <ParallaxScrollView
      headerImage={headerImage}  // Pasamos la imagen al componente ParallaxScrollView
      headerBackgroundColor={{ light: '#B9E8C6', dark: '#2A4D33' }}
      headerTitle="Nutrición">
      <ThemedView style={styles.container}>
        <ThemedText type="title">Nutrición</ThemedText>
        <ThemedText>Registro diario de comidas</ThemedText>
        
        {/* Lista de comidas por categoría */}
        {mealsList.map((category) => (
          <ThemedView key={category.title} style={styles.mealCategory}>
            <ThemedView style={styles.categoryHeader}>
              <ThemedText type="subtitle">{category.title}</ThemedText>
              <TouchableOpacity 
                style={styles.addItemButton}
                onPress={() => {
                  setSelectedMealTitle(category.title);
                  setNewItemText('');
                  Alert.prompt(
                    `Añadir a ${category.title}`,
                    'Introduce el nombre del alimento',
                    [{
                      text: 'Cancelar',
                      style: 'cancel',
                    }, {
                      text: 'Añadir',
                      onPress: (text) => {
                        if (text && text.trim()) {
                          addMealItem(category.title, text.trim());
                        }
                      }
                    }],
                    'plain-text'
                  );
                }}
              >
                <IconSymbol size={20} name="plus" color="#0a7ea4" />
              </TouchableOpacity>
            </ThemedView>
            
            <ThemedView style={styles.mealsList}>
              {category.items.map((item) => (
                <ThemedView key={item.id} style={styles.mealItem}>
                  <ThemedView 
                    style={[styles.checkbox, item.completed && styles.checkboxChecked]}
                    onTouchEnd={() => toggleMealItemCompletion(category.title, item.id)}
                  >
                    {item.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
                  </ThemedView>
                  <ThemedText 
                    style={[styles.mealText, item.completed && styles.mealTextCompleted]}
                  >
                    {item.name}
                  </ThemedText>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => deleteMealItem(category.title, item.id)}
                  >
                    <IconSymbol size={18} name="trash" color="#FF6B6B" />
                  </TouchableOpacity>
                </ThemedView>
              ))}
            </ThemedView>
          </ThemedView>
        ))}
        
        {/* Recomendaciones nutricionales */}
        <ThemedView style={styles.recommendationsContainer}>
          <ThemedText type="subtitle">Recomendaciones</ThemedText>
          
          <ThemedView style={styles.recommendationItem}>
            <ThemedText style={styles.recommendationTitle}>Hidratación</ThemedText>
            <ThemedText style={styles.recommendationText}>
              Recuerda beber al menos 2 litros de agua al día.
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.recommendationItem}>
            <ThemedText style={styles.recommendationTitle}>Proteínas</ThemedText>
            <ThemedText style={styles.recommendationText}>
              Incluye proteínas magras en cada comida principal.
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.recommendationItem}>
            <ThemedText style={styles.recommendationTitle}>Fibra</ThemedText>
            <ThemedText style={styles.recommendationText}>
              Consume al menos 5 porciones de frutas y verduras al día.
            </ThemedText>
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
  mealCategory: {
    marginTop: 20,
  },
  mealsList: {
    marginTop: 10,
  },
  mealItem: {
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
  mealText: {
    fontSize: 16,
    flex: 1,
  },
  mealTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  recommendationsContainer: {
    marginTop: 30,
  },
  recommendationItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  recommendationTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 14,
    opacity: 0.8,
  },
  // Nuevos estilos para los botones
  addItemButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});
