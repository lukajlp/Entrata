import { CompleteModal } from '@/components/CompleteModal';
import { Container } from '@/components/Container';
import { FinalizeModal } from '@/components/FinalizeModal';
import { SeatContent } from '@/components/SeatContent';
import { SeatRow } from '@/types/PlayItem';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useState } from 'react';

cssInterop(LinearGradient, {
  className: {
    target: 'style',
  },
});

const seatData: Record<SeatRow, string[]> = {
  A: [
    'reserved',
    'reserved',
    'reserved',
    'available',
    'available',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
  ],
  B: [
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
  ],
  C: [
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'available',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
  ],
  D: [
    'reserved',
    'reserved',
    'available',
    'available',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'available',
  ],
  E: [
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
  ],
  F: [
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
    'reserved',
  ],
  G: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
};

export default function SeatScreen() {
  const { name, schedule } = useLocalSearchParams();
  const playName = Array.isArray(name) ? name[0] : name || '';
  const parsedSchedule = typeof schedule === 'string' ? JSON.parse(schedule) : {};

  const [selectedDay, setSelectedDay] = useState(Object.keys(parsedSchedule)[0]);
  const [selectedHour, setSelectedHour] = useState(parsedSchedule[selectedDay][0]);
  const [selectedSeats, setSelectedSeats] = useState<Record<SeatRow, number[]>>({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);
  const [purchaseId, setPurchaseId] = useState('');

  const days = Object.keys(parsedSchedule);
  const availableHours = parsedSchedule[selectedDay];

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
    setSelectedHour(parsedSchedule[day][0]);
    setSelectedSeats({ A: [], B: [], C: [], D: [], E: [], F: [], G: [] });
  };

  const handleHourPress = (hour: string) => {
    setSelectedHour(hour);
    setSelectedSeats({ A: [], B: [], C: [], D: [], E: [], F: [], G: [] });
  };

  const handleSeatPress = (row: SeatRow, index: number) => {
    if (seatData[row][index] === 'available') {
      setSelectedSeats((prev) => ({
        ...prev,
        [row]: prev[row].includes(index)
          ? prev[row].filter((seatIndex) => seatIndex !== index)
          : [...prev[row], index],
      }));
    }
  };

  const totalSelectedSeats = (seats: Record<SeatRow, number[]>): number => {
    return Object.values(seats).reduce((acc, seatArray) => acc + seatArray.length, 0);
  };

  const handleFinalizePress = () => {
    const totalSeats = totalSelectedSeats(selectedSeats);
    if (totalSeats > 0) {
      setTotalTickets(totalSeats);
      setModalVisible(true);
    } else {
      alert('Por favor, selecione pelo menos um assento.');
    }
  };

  const handleRemoveSeat = (row: SeatRow, index: number) => {
    setSelectedSeats((prev) => {
      const updatedSeats = {
        ...prev,
        [row]: prev[row].filter((seatIndex) => seatIndex !== index),
      };

      if (totalSelectedSeats(updatedSeats) === 0) {
        setModalVisible(false);
      }

      return updatedSeats;
    });
  };

  const handlePurchasePress = () => {
    const totalSeats = totalSelectedSeats(selectedSeats);
    setTotalTickets(totalSeats);
    setPurchaseId('123456');
    setCompleteModalVisible(true);
    setModalVisible(false);
  };

  return (
    <Container>
      <SeatContent
        days={days}
        availableHours={availableHours}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
        handleDayPress={handleDayPress}
        handleHourPress={handleHourPress}
        handleFinalizePress={handleFinalizePress}
        seatData={seatData}
        selectedSeats={selectedSeats}
        handleSeatPress={handleSeatPress}
      />

      {/* Modal de Finalizar Compra*/}
      <FinalizeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onRemoveSeat={handleRemoveSeat}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
        selectedSeats={selectedSeats}
        onPurchase={handlePurchasePress}
      />

      {/* Modal de Compra Completa */}
      <CompleteModal
        visible={completeModalVisible}
        onClose={() => setCompleteModalVisible(false)}
        totalTickets={totalTickets}
        playName={playName}
        purchaseId={purchaseId}
        playDay={selectedDay}
        playHour={selectedHour}
        playSeats={selectedSeats}
      />
    </Container>
  );
}
