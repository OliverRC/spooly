export interface Filament {
  id: string
  brand: string
  type: string
  color: string
  spoolSize: number
  stockDate: Date
  status: "available" | "finished"
}

