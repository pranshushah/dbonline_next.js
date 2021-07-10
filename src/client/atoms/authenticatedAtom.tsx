import { atom } from 'recoil';

export const authenticatedAtom = atom({
  key: 'authenticatedAtom',
  default: false,
});
