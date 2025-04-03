import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = 120; // Rayon du cercle

const Chronometer: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playIconScale = useSharedValue(1);
  const progress = useSharedValue(0); // Valeur pour l'animation du cercle

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Mettre à jour la progression du cercle au fur et à mesure que le temps passe
    progress.value = withTiming(time / 100, { duration: 1000, easing: Easing.linear });
  }, [time]);

  const startStop = () => {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    setRunning(!running);
    playIconScale.value = withSpring(running ? 1 : 1.15);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    progress.value = withSpring(0); // Réinitialiser l'animation
  };

  const circleStrokeDasharray = 2 * Math.PI * CIRCLE_RADIUS; // Longueur totale du cercle

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} style={styles.circle}>
          <Circle
            cx={width / 2}
            cy={width / 2}
            r={CIRCLE_RADIUS}
            stroke="#007AFF"
            strokeWidth={10}
            strokeDasharray={circleStrokeDasharray}
            strokeDashoffset={circleStrokeDasharray * (1 - progress.value)} // Utilisation de la valeur de progression
            fill="none"
          />
        </Svg>
        <Text style={styles.timer}>{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={startStop} activeOpacity={0.7}>
          <Animated.View style={[styles.button, { transform: [{ scale: playIconScale }] }]}>
            <Icon name={running ? 'pause' : 'play'} size={20} color="white" />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={reset} activeOpacity={0.7}>
          <View style={[styles.button, styles.resetButton]}>
            <Icon name="stop" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fond noir
    width: '100%',
    paddingHorizontal: 20,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40, // Ajout d'espace pour les boutons sous le cercle
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timer: {
    fontSize: 60,
    fontWeight: '600',
    color: '#FFF',
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center', // Centrer les boutons
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
  },
});

export default Chronometer;