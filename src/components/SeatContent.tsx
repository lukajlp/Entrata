import { Button } from '@/components/Button';
import { colors } from '@/styles/colors';
import { SeatRow } from '@/types/PlayItem';
import { FlashList } from '@shopify/flash-list';
import clsx from 'clsx';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

interface SeatContentProps {
  days: string[];
  availableHours: string[];
  selectedDay: string;
  selectedHour: string;
  handleDayPress: (day: string) => void;
  handleHourPress: (hour: string) => void;
  handleFinalizePress: () => void;
  seatData: Record<SeatRow, string[]>;
  selectedSeats: Record<SeatRow, number[]>;
  handleSeatPress: (row: SeatRow, index: number) => void;
}

export const SeatContent = ({
  days,
  availableHours,
  selectedDay,
  selectedHour,
  handleDayPress,
  handleHourPress,
  handleFinalizePress,
  seatData,
  selectedSeats,
  handleSeatPress,
}: SeatContentProps) => {
  return (
    <>
      {/* Data */}
      <Text className={styles.title}>Data</Text>
      <View className={styles.flashlist}>
        <FlashList
          data={days}
          renderItem={({ item }) => (
            <View className="mr-3">
              <Button
                title={item}
                backgroundColor={
                  item === selectedDay ? colors.ButtonPrimary : colors.ButtonSecondary
                }
                size="w-[40px] h-[58px]"
                borderRadius="rounded-3xl"
                font="font-Body text-lg"
                onPress={() => handleDayPress(item)}
              />
            </View>
          )}
          horizontal
          estimatedItemSize={days.length}
        />
      </View>

      <View className={clsx(styles.separator, 'mb-[31px]')} />

      {/* Horário */}
      <Text className={styles.title}>Horário</Text>
      <View className={styles.flashlist}>
        <FlashList
          data={availableHours}
          renderItem={({ item }) => (
            <View className="mr-2">
              <Button
                title={item}
                backgroundColor={
                  item === selectedHour ? colors.ButtonPrimary : colors.ButtonSecondary
                }
                size="w-[107px] h-[42px]"
                borderRadius="rounded-full"
                font="font-Body text-lg"
                onPress={() => handleHourPress(item)}
              />
            </View>
          )}
          horizontal
          estimatedItemSize={availableHours.length}
        />
      </View>

      <View className={clsx(styles.separator, 'mb-[37px]')} />

      {/* Assentos */}
      <View className="mb-14 h-[283px] w-full">
        <LinearGradient
          colors={['#B51111', '#B5111103']}
          className="-z-[-10] size-full rounded-b-[100px] rounded-t-[100px]"
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.2 }}>
          <View className="mt-[85px]">
            {Object.keys(seatData)
              .reverse()
              .map((row) => (
                <View key={row} className="mt-3 w-full flex-row justify-between">
                  <Text className={styles.row}>{row}</Text>
                  <View className="flex-row items-center justify-between">
                    {seatData[row as SeatRow].map((status: string, index: number) => {
                      const isSelected = selectedSeats[row as SeatRow].includes(index);
                      return (
                        <Button
                          key={index}
                          backgroundColor={
                            isSelected
                              ? colors.SeatSelected
                              : status === 'available'
                                ? colors.SeatAvailable
                                : colors.SeatReserved
                          }
                          size="size-5"
                          borderRadius="rounded-2xl mx-1"
                          onPress={() => handleSeatPress(row as SeatRow, index)}
                        />
                      );
                    })}
                  </View>
                  <Text className={styles.row}>{row}</Text>
                </View>
              ))}
          </View>
        </LinearGradient>
      </View>

      {/* Legenda */}
      <View className="w-full flex-row justify-between">
        <View className="flex-row items-center">
          <Button backgroundColor={colors.SeatAvailable} size="size-5" borderRadius="rounded-2xl" />
          <Text className="ml-3 text-white">Disponível</Text>
        </View>
        <View className="flex-row items-center">
          <Button backgroundColor={colors.SeatReserved} size="size-5" borderRadius="rounded-2xl" />
          <Text className="ml-3 text-white">Comprado</Text>
        </View>
        <View className="flex-row items-center">
          <Button backgroundColor={colors.SeatSelected} size="size-5" borderRadius="rounded-2xl" />
          <Text className="ml-3 text-white">Selecionado</Text>
        </View>
      </View>

      {/* Botão Finalizar */}
      <View className={styles.button}>
        <Button
          title="Finalizar"
          backgroundColor={colors.ButtonPrimary}
          size="w-[250px] h-[50px]"
          borderRadius="rounded-lg"
          font="font-Highlight text-xl"
          onPress={handleFinalizePress}
        />
      </View>
    </>
  );
};

const styles = {
  title: 'mb-[34px] text-center font-Body text-2xl font-normal text-PrimaryText',
  separator: 'mt-[27px] h-[1px] w-full bg-Separator',
  flashlist: 'w-full flex-row justify-center',
  row: 'text-center font-Highlight text-base text-white',
  button: 'mt-11 items-center justify-center',
};
