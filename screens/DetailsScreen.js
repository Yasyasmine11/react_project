import React from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { addToShoppingList ,incrementQuantity,decrementQuantity } from '../store/slices/shoppingListSlice';

const DetailsScreen = ({ route }) => {
  const { cocktail } = route.params;

  const { strDrink, strDrinkThumb, strInstructions, strIngredients, strCategory, strAlcoholic, strGlass } = cocktail;
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    if (cocktail[`strIngredient${i}`] && cocktail[`strMeasure${i}`]) {
      ingredients.push({
        ingredient: cocktail[`strIngredient${i}`],
        measure: cocktail[`strMeasure${i}`],
      });
    }
  }
  const steps = strInstructions ? strInstructions.split('.').filter(step => step.trim() !== '') : [];

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.includes(cocktail.idDrink);

  const handleAddToShoppingList = (ingredient, measure) => {
    dispatch(addToShoppingList({ ingredient, measure }));
  };


  const handleIncrement = (ingredient) => {
    dispatch(incrementQuantity(ingredient));
  };

  const handleDecrement = (ingredient) => {
    dispatch(decrementQuantity(ingredient));
  };

  const shoppingList = useSelector(state => state.shoppingList.items);


  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: strDrinkThumb }}
        style={styles.image}
        resizeMode="cover"
      />
       <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{strDrink}</Text>
          <TouchableOpacity 
            onPress={() => dispatch(toggleFavorite(cocktail.idDrink))}
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
          <View style={styles.categoryTextContainer}>
            <Ionicons name="wine" size={16} color="#666" />
            <Text style={styles.categoryText}>{strCategory}</Text>
          </View>
          <View style={styles.categoryTextContainer}>
            <Ionicons name="beer" size={16} color="#666" />
            <Text style={styles.categoryText}>{strAlcoholic}</Text>
          </View>
          <View style={styles.categoryTextContainer}>
            <Ionicons name="water" size={16} color="#666" />
            <Text style={styles.categoryText}>{strGlass}</Text>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.verticalLine} />
          <Text style={styles.sectionTitle}>Ingrédients</Text>
        </View>

        <View style={styles.ingredientsContainer}>
        {ingredients.map((item, index) => {
          const inCart = shoppingList[item.ingredient];

          return (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.ingredientInfo}>
                <Text style={styles.ingredient}>{item.ingredient}</Text>
                <Text style={styles.measure}>{item.measure}</Text>
              </View>

              {inCart ? (
                <View style={styles.counterContainer}>
                  <TouchableOpacity onPress={() => handleDecrement(item.ingredient)} style={styles.counterButton}>
                    <Ionicons name="remove-circle-outline" size={24} color="#ED7868" />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{inCart.count}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item.ingredient)} style={styles.counterButton}>
                    <Ionicons name="add-circle-outline" size={24} color="#A5BB80" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToShoppingList(item.ingredient, item.measure)}>
                  <Ionicons name="cart-outline" size={24} color="#A5BB80" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.verticalLine} />
          <Text style={styles.sectionTitle}>Instructions</Text>
        </View>

        <View style={styles.instructionsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step.trim()}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  infoContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: "#ED7868",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: "space-between"
  },
  categoryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  verticalLine: {
    width: 8,
    height: 30,
    backgroundColor: '#A5BB80',
    marginRight: 10,
    marginLeft: 8,
    borderRadius: 5
  },
  ingredientsContainer: {
    marginTop: 8,
    padding: 16,
    borderRadius: 9,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#A5BB80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredient: {
    fontSize: 14,
    color: '#333',
  },
  measure: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  addToCartButton: {
    padding: 8,
  },
  instructionsContainer: {
    padding: 16,
    borderRadius: 9,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#A5BB80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "#ED7868",
    marginRight: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    padding: 4,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
});

export default DetailsScreen;
