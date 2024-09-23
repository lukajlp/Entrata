import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export const Headertitle = ({
  title,
  back,
  onPressBack,
}: {
  title: string;
  back?: boolean;
  onPressBack?: () => void;
}) => {
  return (
    <View className={styles.container}>
      {back && (
        <Pressable className={styles.back} onPress={onPressBack}>
          <Ionicons name="arrow-back" size={24} color={colors.PrimaryText} />
        </Pressable>
      )}
      <Image source={require('@/assets/logo.png')} className={styles.logo} resizeMode="contain" />
      <Text className={styles.title}>{title}</Text>
    </View>
  );
};

const styles = {
  container: 'flex-row items-center justify-center',
  back: 'px-1',
  logo: 'mr-2 size-24',
  title: 'font-Title text-3xl font-bold text-PrimaryText',
};
