import { Database } from "./database.types";

export type Filament = Database["public"]["Tables"]["filaments"]["Row"];
export type AddFilament = Database["public"]["Tables"]["filaments"]["Insert"];
export type UpdateFilament = Database["public"]["Tables"]["filaments"]["Update"];

export type BrandOption = {
    value: string;
    label: string;
  };