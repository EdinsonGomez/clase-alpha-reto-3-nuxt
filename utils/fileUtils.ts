import type { AverageDoc } from "~/types/averageTypes";

const textToArray = (textResult = '') => {
  const listData = textResult
    .split("\n")
    .map((row) => row.split("#"))
    .map((row) =>
      row.map((v) => {
        let value = v.trim();

        if (!Number(v)) {
          return value;
        }

        return +value;
      })
    );

  return listData;
};

export const textToDocs = (textResult = ""): AverageDoc[] => {
  const listData = textToArray(textResult);
  
  const data = listData
    .map((row, idx) => {
      const doc: AverageDoc = {}

      row.forEach((v) => {
        if (typeof v === 'string') {
          doc.name = v;
          return;
        }
      
        if (typeof v === 'number' && v === idx + 1) {
          doc.order = v;
          return
        }
      
        if (typeof v === 'number' && Number.isInteger(v) && v !== idx + 1) {
          doc.id = v;
          return;
        }
      
        if (typeof v === 'number' && !Number.isInteger(v) && v !== idx + 1) {
          doc.average = v;
          return;
        }
      })

      return doc;
    })
    .filter((doc) => doc.id);

  return data;
};