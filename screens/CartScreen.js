import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromShoppingList, incrementQuantity, decrementQuantity, clearShoppingList } from '../store/slices/shoppingListSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shoppingList.items);
  
  const items = Object.entries(shoppingList).map(([ingredient, details]) => ({
    ingredient,
    ...details
  }));

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.ingredient}</Text>
      <Text style={styles.itemMeasure}>{item.measure} (x{item.count})</Text>
    </View>
    
    <View style={styles.counterContainer}>
      {item.count > 1 && (
        <TouchableOpacity 
          onPress={() => dispatch(decrementQuantity(item.ingredient))}
          style={styles.counterButton}
        >
          <Ionicons name="remove-circle-outline" size={24} color="#ED7868" />
        </TouchableOpacity>
      )}
  
      <Text style={styles.counterText}>{item.count}</Text>
  
      <TouchableOpacity 
        onPress={() => dispatch(incrementQuantity(item.ingredient))}
        style={styles.counterButton}
      >
        <Ionicons name="add-circle-outline" size={24} color="#A5BB80" />
      </TouchableOpacity>
    </View>
  
    {item.count === 1 && (
      <TouchableOpacity 
        onPress={() => dispatch(removeFromShoppingList(item.ingredient))}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={24} color="#ED7868" />
      </TouchableOpacity>
    )}
  </View>
  
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.verticalLine} />
        <Text style={styles.headerTitle}>Ma liste de courses</Text>
      </View>
      
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.ingredient}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => dispatch(clearShoppingList())}
          >
            <Text style={styles.clearButtonText}>Vider la liste</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Votre liste de courses est vide</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderRadius: 5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemMeasure: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
  removeButton: {
    padding: 8,
  },
  clearButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ED7868',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CartScreen;
