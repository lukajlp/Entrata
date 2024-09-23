import { cssInterop } from 'nativewind';
import { SafeAreaView, ScrollView } from 'react-native';

cssInterop(ScrollView, {
  className: {
    target: 'contentContainerStyle',
  },
});

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className={styles.safeArea}>
      <ScrollView className={styles.container}>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: 'flex-1',
  container: 'flex-grow p-6 bg-Background justify-center',
};
