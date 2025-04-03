import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((t) => String(t).padStart(2, "0")).join(":");
};

const ActivityScreen: React.FC = () => {
  const { name, duration } = useLocalSearchParams<{ name: string; duration: string }>();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Convertir la durée en secondes
  const getSeconds = (duration: string) => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[0]) * (duration.includes("min") ? 60 : 1) : 0;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && !isPaused && timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft]);

  const startTimer = () => {
    setTimeLeft(getSeconds(duration));
    setIsRunning(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Durée : {duration}</Text>

      {timeLeft !== null && (
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      )}

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Démarrer</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={togglePause}>
              <Text style={styles.buttonText}>{isPaused ? "Continuer" : "Pause"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopTimer}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 10,
    color: "#A1A1A1",
  },
  timer: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF9500",
    padding: 15,
    borderRadius: 10,
  },
  pauseButton: {
    backgroundColor: "#007AFF",
  },
  stopButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ActivityScreen;
