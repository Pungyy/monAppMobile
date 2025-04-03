import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Switch } from "react-native";

const SettingsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Paramètres</Text>

      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Mode Sombre</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? "#FFF" : "#333"}
        />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Sons</Text>
        <Switch
          value={isSoundEnabled}
          onValueChange={setIsSoundEnabled}
          thumbColor={isSoundEnabled ? "#4CD964" : "#333"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F2F2F7",
  },
  darkContainer: {
    backgroundColor: "#1C1C1E",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
  },
  darkText: {
    color: "#FFF",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D6",
  },
  settingText: {
    fontSize: 18,
    color: "#000",
  },
});

export default SettingsScreen;
