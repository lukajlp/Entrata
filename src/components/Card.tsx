import { PlayItem } from '@/types/PlayItem';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Image, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CardProps {
  item: PlayItem;
}

export const Card = ({ item }: CardProps) => {
  const flipAnim = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${flipAnim.value * 180}deg` }],
    };
  });

  const handlePress = () => {
    flipAnim.value = withSpring(flipAnim.value === 0 ? 1 : 0, { damping: 5 });
    setTimeout(() => {
      router.push({
        pathname: '/SeatScreen',
        params: { name: item.name, schedule: JSON.stringify(item.schedule) },
      });
    }, 200);
  };

  useFocusEffect(
    useCallback(() => {
      flipAnim.value = 0;
    }, [])
  );

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[animatedStyle]} className={styles.card}>
        <Image source={item.source} className={styles.logo} resizeMode="stretch" />
      </Animated.View>
    </Pressable>
  );
};

const styles = {
  card: 'p-2.5 rounded-2xl items-center mb-[73px] shadow-md',
  logo: 'w-48 h-64',
};
