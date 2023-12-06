import { AverageDoc } from "~/types/averageTypes";
import { db } from "./firestore";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";

export const saveAverages = async (list: AverageDoc[] = []) => {
  const collectionRef = collection(db, 'averages');

  await Promise.all(
    list.map((data: AverageDoc) => {
      const { id, ...docData } = data;

      const docRef = doc(collectionRef, `${id}`);

      return setDoc(docRef, docData);
    })
  );
};

export const getAverages = async () => {
  let averages: Array<AverageDoc> = [];
  const docs = await getDocs(collection(db, "averages"));

  docs.forEach((doc) => {
    const data = doc.data();
    averages.push({
      id: Number(doc.id),
      ...data,
    });
  });

  return averages;
};
