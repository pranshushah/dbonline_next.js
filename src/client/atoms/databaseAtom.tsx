import { database } from '../utils/interface';
import { set, get } from 'idb-keyval';
import { atomFamily } from 'recoil';
export const databaseState = atomFamily<{} | database, string>({
  key: 'databaseState',
  default: { databaseName: '', mainTableDetails: [], tableDndDetails: [] },
  effects_UNSTABLE: (key) => [
    ({ onSet, setSelf, trigger }) => {
      onSet((newValue) => {
        set(key, newValue);
      });
      if (trigger === 'get') {
        if (key) {
          get(key).then((val: database | null) => {
            if (val) {
              setSelf(val);
            }
          });
        }
      }
    },
  ],
});
