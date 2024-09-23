export interface PlayItem {
  name: string;
  source: any;
  schedule: Record<string, string[]>;
}

export type SeatRow = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';