import { colors } from '@/styles/colors';
import { SeatRow } from '@/types/PlayItem';
import { AntDesign } from '@expo/vector-icons';
import clsx from 'clsx';
import { Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from './Button';

interface FinalizeModalProps {
  visible: boolean;
  onClose: () => void;
  onRemoveSeat: (row: SeatRow, index: number) => void;
  onPurchase: () => void;
  selectedDay: string;
  selectedHour: string;
  selectedSeats: Record<string, number[]>;
}

export const FinalizeModal = ({
  visible,
  onClose,
  onRemoveSeat,
  onPurchase,
  selectedDay,
  selectedHour,
  selectedSeats,
}: FinalizeModalProps) => {
  const selectedSeatRows = Object.entries(selectedSeats).flatMap(([row, indices]) =>
    indices.map((index) => ({ row, index }))
  );
  const totalSeats = selectedSeatRows.length;
  const totalPrice = totalSeats * 20;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className={styles.modal}>
          <View className={styles.modalContent}>
            <Text className={styles.title}>Assentos Selecionados</Text>
            <Text className={styles.title}>
              Dia {selectedDay} às {selectedHour}
            </Text>
            {selectedSeatRows.map(({ row, index }) => (
              <View key={`${row}-${index}`} className={styles.ticket}>
                <Button
                  backgroundColor={colors.SeatSelected}
                  size="size-6"
                  borderRadius="rounded-2xl"
                />
                <Text className={clsx(styles.body, 'ml-7')}>
                  Fileira {row} / Assento {String(index + 1).padStart(2, '0')}
                </Text>
                <Text className={clsx(styles.body, 'mx-4')}>R$ 20</Text>
                <Pressable onPress={() => onRemoveSeat(row as SeatRow, index)}>
                  <AntDesign name="close" size={24} color={colors.RemoveSeat} />
                </Pressable>
              </View>
            ))}
            <Pressable className={styles.button} onPress={onPurchase}>
              <Text className={clsx(styles.body, 'text-center')}>Comprar (R$ {totalPrice})</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  modal: 'mt-[88px] flex-1 items-center',
  modalContent: 'h-auto w-full rounded-lg bg-Background p-4',
  title: 'mb-4 text-center font-Body text-xl uppercase text-white',
  ticket: 'mt-4 flex-row items-center justify-center',
  body: 'font-Highlight text-xl text-white',
  button: 'mt-16 rounded-md bg-ButtonPrimary p-2',
};
