export type Channel = 'voice' | 'animals' | 'instruments' | 'ambience';
export type RecordedId = 'duck_main' | 'cow_friend' | 'chick_friend' | 'hello' | 'goodbye' | 'cow' | 'chick' | 'rabbit' | 'flower';
export interface Recording {
  channel: 'voice' | 'animals'; url: string | null; origin: string | null;
  license: string | null; species?: string; lifeStage?: string;
}
// Só preencher URLs locais após registrar os direitos e revisar espécie/idade.
export const recordings: Record<RecordedId, Recording> = {
  duck_main: { channel: 'animals', url: null, origin: null, license: null, species: 'pato (espécie a aprovar)', lifeStage: 'filhote' },
  cow_friend: { channel: 'animals', url: null, origin: null, license: null, species: 'Bos taurus', lifeStage: 'adulta' },
  chick_friend: { channel: 'animals', url: null, origin: null, license: null, species: 'Gallus gallus domesticus', lifeStage: 'pintinho' },
  hello: { channel: 'voice', url: null, origin: null, license: null },
  goodbye: { channel: 'voice', url: null, origin: null, license: null },
  cow: { channel: 'voice', url: null, origin: null, license: null },
  chick: { channel: 'voice', url: null, origin: null, license: null },
  rabbit: { channel: 'voice', url: null, origin: null, license: null },
  flower: { channel: 'voice', url: null, origin: null, license: null },
};
