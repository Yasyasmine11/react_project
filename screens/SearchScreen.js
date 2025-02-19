import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity, ActivityIndicator, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CocktailCard from '../components/cocktailCard';


const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('name');


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
      );
      const data = await response.json();
      setCategories(data.drinks.map(cat => cat.strCategory));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const searchCocktails = async () => {
    setLoading(true);
    try {
      let drinks = [];

      if (selectedCategory) {
        const categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`;
        const categoryResponse = await fetch(categoryUrl);
        if (!categoryResponse.ok) throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        const categoryData = await categoryResponse.json();

        if (categoryData.drinks) {
          drinks = categoryData.drinks.slice(0, 5);
        }
      }

      if (searchQuery.length > 2) {
        let searchUrl;
        if (searchMode === 'name') {
          searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;
        } else {
          searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(searchQuery)}`;
        }        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) throw new Error(`HTTP error! Status: ${searchResponse.status}`);
        const searchData = await searchResponse.json();

        if (searchData.drinks) {
          drinks = searchData.drinks.slice(0, 5);
        }
      }

      if (drinks.length === 0) {
        setResults([]);
        return;
      }

      const detailedDrinks = await Promise.all(
        drinks.map(async (drink) => {
          const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
          if (res.ok) {
            const drinkData = await res.json();
            return drinkData.drinks ? drinkData.drinks[0] : null;
          }
          return null;
        })
      );

      setResults(detailedDrinks.filter(Boolean));
    } catch (error) {
      console.error('Error searching cocktails:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (selectedCategory || searchQuery.length > 2) {
      const timeout = setTimeout(searchCocktails, 500);
      return () => clearTimeout(timeout);
    }
  }, [selectedCategory, searchQuery, searchMode]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={`Rechercher par ${searchMode === 'name' ? 'nom' : 'ingrédient'}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setSearchMode(searchMode === 'name' ? 'ingredient' : 'name')}
        >
          <Ionicons name="sync" size={20} color="white" style={styles.toggleIcon} />
          <Text style={styles.toggleText}>
            {searchMode === 'name' ? ' Ingrédient' : ' Nom'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategory,
              ]}
              onPress={() => {
                setSelectedCategory(selectedCategory === item ? null : item);
                setSearchQuery('');
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#A5BB80" />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <CocktailCard
              cocktail={item}
              onPress={() => navigation.navigate('Details', { cocktail: item })}
            />
          )}
          keyExtractor={item => item.idDrink}
          contentContainerStyle={styles.resultsContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="wine" size={40} color="#ED7868" style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>
                Aucun résultat trouvé
              </Text>
              <Text style={styles.emptyText}>Essayez de chercher un cocktail par son <Text style={{ fontWeight: 'bold' }}>nom </Text>
                ou ses
                <Text style={{ fontWeight: 'bold' }}> ingrédients</Text> !
              </Text>
            </View>
          }
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    margin: 16,
  },
  searchIcon: {
    marginRight: 10,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 8,
  },
  selectedCategory: {
    backgroundColor: '#A5BB80',
  },
  categoryText: {
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  loader: {
    marginTop: 20,
  },
  resultsContainer: {
    padding: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20 
  },

  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c7c8c9',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: "#c7c8c9",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  toggleIcon: {
    marginRight: 6,
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: { 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  emptyIcon: { 
    marginBottom: 10 ,
    marginTop:70
  },
  emptyTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 6 
  },
});


export default SearchScreen;


