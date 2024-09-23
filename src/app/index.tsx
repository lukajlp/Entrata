import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { PlayItem } from '@/types/PlayItem';
import { FlashList } from '@shopify/flash-list';
import { useWindowDimensions } from 'react-native';

const Data: PlayItem[] = [
  {
    name: 'Rei Leao',
    source: require('@/assets/peca-leao.png'),
    schedule: {
      '21': ['19:00', '21:00', '23:00'],
      '22': ['13:00', '14:30'],
      '23': ['16:00', '20:00'],
      '24': ['20:00', '23:00'],
      '25': ['21:00', '22:00'],
      '26': ['17:00', '21:00'],
      '27': ['10:00', '16:00'],
    },
  },
  {
    name: 'Hamlet',
    source: require('@/assets/peca-hamlet.png'),
    schedule: {
      '18': ['19:00', '21:00', '23:00'],
      '19': ['13:00', '14:30'],
      '22': ['16:00', '20:00'],
      '25': ['20:00', '23:00'],
      '27': ['21:00', '22:00'],
      '29': ['17:00', '21:00'],
      '31': ['10:00', '16:00'],
    },
  },
  {
    name: 'Edipo',
    source: require('@/assets/peca-edipo.png'),
    schedule: {
      '20': ['19:00', '21:00', '23:00'],
      '21': ['13:00', '14:30'],
      '22': ['16:00', '20:00'],
      '23': ['20:00', '23:00'],
      '24': ['21:00', '22:00'],
      '25': ['17:00', '21:00'],
      '26': ['10:00', '16:00'],
    },
  },
  {
    name: 'Romeu e Julieta',
    source: require('@/assets/peca-romeujulieta.png'),
    schedule: {
      '19': ['19:00', '21:00', '23:00'],
      '20': ['13:00', '14:30'],
      '21': ['16:00', '20:00'],
      '22': ['20:00', '23:00'],
      '23': ['21:00', '22:00'],
      '24': ['17:00', '21:00'],
      '25': ['10:00', '16:00'],
    },
  },
];

export default function Home() {
  const { width } = useWindowDimensions();
  const numColumns = Math.floor(width / (width * 0.4));

  return (
    <Container>
      <FlashList
        data={Data}
        renderItem={({ item }) => <Card item={item} />}
        estimatedItemSize={Data.length}
        numColumns={numColumns}
      />
    </Container>
  );
}
