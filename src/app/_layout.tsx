import { Headertitle } from '@/components/HeaderTitle';
import { colors } from '@/styles/colors';
import '@/styles/global.css';
import { Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { Roboto_300Light, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import * as MediaLibrary from 'expo-media-library';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (status === null) {
    requestPermission();
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.Background },
        headerTitle: () => (
          <Headertitle
            title="Theatre of Despair"
            back={router.canGoBack()}
            onPressBack={router.back}
          />
        ),
        headerShadowVisible: false,
        headerTintColor: colors.PrimaryText,
        headerBackVisible: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SeatScreen" />
    </Stack>
  );
}
