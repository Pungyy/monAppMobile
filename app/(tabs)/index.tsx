import React from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const activities = [
  { id: "1", name: "Pompes", duration: "30 sec", icon: "fitness-outline" },
  { id: "2", name: "Squats", duration: "45 sec", icon: "barbell-outline" },
  { id: "3", name: "Burpees", duration: "40 sec", icon: "flame-outline" },
  { id: "4", name: "Jumping Jacks", duration: "60 sec", icon: "walk-outline" },
  { id: "5", name: "Gainage", duration: "1 min", icon: "body-outline" },
];

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💪 Entraînement du jour</Text>
        <Text style={styles.subtitle}>Choisissez une activité et commencez !</Text>
      </View>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer} // Ajout de padding pour éviter l'effet collé
        renderItem={({ item }) => (
          <Link href={{ pathname: "/activity", params: { name: item.name, duration: item.duration } }} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={30} color="#FF9500" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDuration}>{item.duration}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#A1A1A1" />
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

// ✅ **Styles pro et inspirés d'iOS**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center", // ✅ Centre le titre
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#A1A1A1",
    textAlign: "center", // ✅ Centre le sous-titre
  },
  listContainer: {
    paddingBottom: 20, // ✅ Ajoute de l’espace en bas pour éviter un effet coupé
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 20, // ✅ Plus d'espace dans les cards
    marginBottom: 15, // ✅ Plus d'espace entre chaque card
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  iconContainer: {
    backgroundColor: "#3A3A3C",
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20, // ✅ Légèrement plus grand
    fontWeight: "bold",
    color: "#FFF",
  },
  cardDuration: {
    fontSize: 16,
    color: "#FF9500",
    marginTop: 3,
  },
});

export default HomeScreen;
