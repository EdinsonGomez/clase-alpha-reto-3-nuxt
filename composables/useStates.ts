import type { AverageDoc } from "~/types/averageTypes"

interface AverageReq {
  loading: Boolean,
  error: String | undefined,
  list: AverageDoc[]
}

export const useAveragesReq = () => useState('averagesReq', (): AverageReq => ({
  loading: false,
  error: '',
  list: []
}))