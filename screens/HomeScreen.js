import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import CocktailCard from '../components/cocktailCard';

const HomeScreen = ({ navigation }) => {

  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomCocktails = async () => {
    try {
      const promises = Array(20).fill().map(() =>
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
          .then(response => response.json())
      );

      const results = await Promise.all(promises);
      const drinks = results.map(result => result.drinks[0]);
      setCocktails(drinks);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7f9deb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barre}>
      <View style={styles.titleContainer}>
        <View style={styles.verticalLine} />
        
        <Text style={styles.title}>Découvrez nos cocktails du moment !</Text>
      </View>
      </View>
      
      <FlatList
        data={cocktails}
        renderItem={({ item }) => (
          <CocktailCard
            cocktail={item}
            onPress={() => navigation.navigate('Details', { cocktail: item })}
          />
        )}
        keyExtractor={item => item.idDrink}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: 5,
    height: 20,
    backgroundColor: '#A5BB80',
    marginRight: 10,
    marginLeft: 30,
    borderRadius: 5
  },
 
});

export default HomeScreen;

