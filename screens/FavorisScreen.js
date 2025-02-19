import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CocktailCard from '../components/cocktailCard';

const FavorisScreen = ({ navigation }) => {
  const [favoriteCocktails, setFavoriteCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoriteIds = useSelector(state => state.favorites.items);

  useEffect(() => {
    fetchFavoriteCocktails();
  }, [favoriteIds]);

  const fetchFavoriteCocktails = async () => {
    setLoading(true);
    try {
      const cocktailsPromises = favoriteIds.map(id =>
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then(response => response.json())
          .then(data => data.drinks[0])
      );

      const cocktails = await Promise.all(cocktailsPromises);
      setFavoriteCocktails(cocktails.filter(Boolean));
    } catch (error) {
      console.error('Error fetching favorite cocktails:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && favoriteIds.length > 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A5BB80" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.verticalLine} />
        <Text style={styles.headerTitle}>Mes Cocktails Favoris</Text>
      </View>

      {favoriteIds.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Vous n'avez pas encore de favoris</Text>
          <Text style={styles.emptySubText}>
            Ajoutez des cocktails à vos favoris en cliquant sur le cœur
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteCocktails}
          renderItem={({ item }) => (
            <CocktailCard
              cocktail={item}
              onPress={() => navigation.navigate('Details', { cocktail: item })}
            />
          )}
          keyExtractor={item => item.idDrink}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  verticalLine: {
    width: 5,
    height: 20,
    backgroundColor: '#A5BB80',
    marginRight: 10,
    marginLeft: 20,
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
export default FavorisScreen;
