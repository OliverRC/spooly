import { BrandOption } from "@/types";
import { toast } from "sonner";
import FilamentInventory from "@/components/filaments/inventory";
import { createClient } from "@/utils/supabase/server";

const brands: BrandOption[] = [
  { value: "3DXTech", label: "3DXTech" },
  { value: "Atomic", label: "Atomic Filament" },
  { value: "ColorFabb", label: "ColorFabb" },
  { value: "ESun", label: "eSUN" },
  { value: "Fiberlogy", label: "Fiberlogy" },
  { value: "Fillamentum", label: "Fillamentum" },
  { value: "FormFutura", label: "FormFutura" },
  { value: "Hatchbox", label: "Hatchbox" },
  { value: "MatterHackers", label: "MatterHackers" },
  { value: "Overture", label: "Overture" },
  { value: "PolyMaker", label: "PolyMaker" },
  { value: "Prusament", label: "Prusament" },
  { value: "Proto-Pasta", label: "Proto-Pasta" },
  { value: "Sunlu", label: "Sunlu" },
  { value: "Taulman3D", label: "Taulman3D" },
];

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('filaments').select();
  
  if (error) {
    toast.error(error.message);
  }

  return (
    <FilamentInventory
      brands={brands}
      filaments={data || []}
    />  
  );
}
