import { getAverages } from '../lib/firestoreRequest';

export default defineEventHandler(async () => {
  const list = await getAverages();

  if (list.length) {
    list.sort((a, b) => Number(a.order) - Number(b.order));
  }

  return list;
})