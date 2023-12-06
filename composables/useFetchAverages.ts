import type { AverageDoc } from "~/types/averageTypes";

export const useFetchAverages = () => {
  const averagesReq = useAveragesReq();

  const fetchAverages = async () => {
    averagesReq.value.loading = true;
    averagesReq.value.list = [];
  
    const response = await $fetch('/api/averages', { method: "GET" }).catch((error) => {
      averagesReq.value.error = error.message;
    });

    if (response) {
      let list: AverageDoc[] = response;
      averagesReq.value.list = list
    }

    averagesReq.value.loading = false;

  }

  return { fetchAverages }
}