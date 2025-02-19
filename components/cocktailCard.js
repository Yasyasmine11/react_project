import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';


const CocktailCard = ({ cocktail, onPress }) => {
  const category = cocktail.strCategory || 'Non catégorisé';
  const alcoholic = cocktail.strAlcoholic || 'Information non disponible';

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.includes(cocktail.idDrink);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); 
    dispatch(toggleFavorite(cocktail.idDrink));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: cocktail.strDrinkThumb }} 
        style={styles.image}
        resizeMode="cover"
      />
        <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{cocktail.strDrink}</Text>
          <TouchableOpacity 
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#ED7868" : "#666"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoryContainer}>
          <View style={styles.categoryItem}>
            <Ionicons name="wine" size={16} color="#666" />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <View style={styles.categoryItem}>
            <Ionicons name="beer" size={16} color="#666" />
            <Text style={styles.categoryText}>{alcoholic}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default CocktailCard;

