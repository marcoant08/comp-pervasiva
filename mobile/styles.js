import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ADD8E6",
  },

  container: {
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 10,
    minHeight: 60,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
  },

  button: {
    height: 40,
    width: 150,
    backgroundColor: "#888",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
