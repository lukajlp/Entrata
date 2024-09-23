import clsx from 'clsx';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';

interface CompleteProps {
  visible: boolean;
  onClose: () => void;
  totalTickets: number;
  purchaseId: string;
  playName: string;
  playDay: string;
  playHour: string;
  playSeats: Record<string, number[]>;
}

export const CompleteModal = ({
  visible,
  onClose,
  totalTickets,
  purchaseId,
  playName,
  playDay,
  playHour,
  playSeats,
}: CompleteProps) => {
  const viewRef = useRef<View>(null);
  const playSeatsRows = Object.entries(playSeats).flatMap(([row, indices]) =>
    indices.map((index) => ({ row, index }))
  );

  const handleSaveTickets = async () => {
    if (viewRef.current) {
      try {
        const uri = await captureRef(viewRef.current, {
          height: 400,
          format: 'png',
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(uri);

        await Sharing.shareAsync(uri);

        router.replace('/');
      } catch (error) {
        console.error('Erro ao capturar a imagem:', error);
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View ref={viewRef} className={styles.modal}>
        <View className={styles.modalContent}>
          <Text className={styles.title}>Parabéns</Text>
          <Text className={clsx(styles.body, 'mb-4')}>
            Você comprou {totalTickets} tickets para a peça do {playName}. Para o dia {playDay} e
            hora {playHour}:
          </Text>
          {playSeatsRows.map(({ row, index }) => (
            <Text key={`${row}-${index}`} className={styles.ticket}>
              Fileira {row} / Assento {String(index + 1).padStart(2, '0')}
            </Text>
          ))}
          <Text className={clsx(styles.body, 'my-4')}>
            Por favor, clique em salvar e mostre antes de entrar no teatro.
          </Text>

          <View className={styles.qrcode}>
            <QRCode
              value={purchaseId}
              size={200}
              logo={require('@/assets/logo.png')}
              logoBackgroundColor="red"
              logoSize={40}
            />
          </View>

          <Pressable className={styles.button} onPress={handleSaveTickets}>
            <Text className={styles.buttonText}>Salvar Tickets</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modal: 'flex-1 items-center justify-center bg-black bg-opacity-50',
  modalContent: 'w-[80%] rounded-lg bg-white p-4',
  title: 'mb-4 text-center font-Highlight text-xl font-semibold uppercase',
  body: 'text-center font-Body text-lg font-semibold',
  ticket: 'text-center font-Body text-lg font-bold',
  qrcode: 'mb-6 items-center justify-center',
  button: 'mb-3 rounded-md bg-ButtonPrimary p-2',
  buttonText: 'text-center font-Highlight text-lg text-white',
};
