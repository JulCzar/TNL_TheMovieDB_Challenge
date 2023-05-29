//
import { PersistentStorage } from 'persistor-node';

export const persistentStorage = PersistentStorage.getOrCreate('myserielist', {
  storage: process.browser ? localStorage : ({} as Storage),
});
