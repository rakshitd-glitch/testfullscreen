const KEY = 'er_store_v1';

type Store = {
  selectedCharacter: 1 | 2;
  highScore: number;
};

const defaultStore: Store = {
  selectedCharacter: 1,
  highScore: 0
};

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultStore };
    const parsed = JSON.parse(raw) as Store;
    return { ...defaultStore, ...parsed };
  } catch {
    return { ...defaultStore };
  }
}

function save(store: Partial<Store>) {
  const curr = load();
  const next = { ...curr, ...store };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export default { load, save };
export type { Store };
