import { StyleSheet } from "react-native";

// Common styles
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
export const screenOptions = {
  headerStyle: {
    // backgroundColor: "#A5BB80",
    backgroundColor: "#fff",

  },
  headerTintColor: "#ED7868",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize:19,
  },
};

export default styles;
