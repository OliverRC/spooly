"use client";

import FilamentTable from "@/components/filaments/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filament } from "@/types/filament";
import { PlusCircle } from "lucide-react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddEditFilamentForm } from "@/components/filaments/add-edit";
import { BrandOption } from "@/types/brand";
import { toast } from "sonner";

const exampleFilaments: Filament[] = [
  {
    id: "1",
    brand: "ESun",
    type: "PLA",
    color: "Black",
    spoolSize: 1000,
    status: "available",
    date: new Date("2022-01-01"),
  },
  {
    id: "2",
    brand: "ESun",
    type: "PLA",
    color: "White",
    spoolSize: 1000,
    status: "available",
    date: new Date("2022-03-01"),
  },
  {
    id: "3",
    brand: "ESun",
    type: "ABS",
    color: "Black",
    spoolSize: 1000,
    status: "finished",
    date: new Date("2022-04-01"),
  },
  {
    id: "4",
    brand: "ColorFabb",
    type: "XT",
    color: "NinjaFlex",
    spoolSize: 500,
    status: "available",
    date: new Date("2022-05-01"),
  },
  {
    id: "5",
    brand: "Prusament",
    type: "PLA",
    color: "Galaxy Blue",
    spoolSize: 1000,
    status: "available",
    date: new Date("2022-06-01"),
  },
  {
    id: "6",
    brand: "Prusament",
    type: "PETG",
    color: "Galaxy Blue",
    spoolSize: 1000,
    status: "finished",
    date: new Date("2022-07-01"),
  },
  {
    id: "7",
    brand: "Prusament",
    type: "ASA",
    color: "Galaxy Blue",
    spoolSize: 1000,
    status: "available",
    date: new Date("2022-08-01"),
  },
  {
    id: "8",
    brand: "Prusament",
    type: "ASA",
    color: "Galaxy Black",
    spoolSize: 1000,
    status: "finished",
    date: new Date("2022-09-01"),
  },
];

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

export default function Home() {
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [addEditFilament, setAddEditFilament] = useState<Filament | null>(null);

  const [filaments, setFilaments] = useState<Filament[]>(exampleFilaments);

  const addFilament = () => {
    setAddEditFilament(null);
    setIsAddEditDialogOpen(true);
  };

  const handleAddFilament = (
    values: Omit<Filament, "id" | "status"> &
      Partial<Pick<Filament, "id" | "status">>
  ) => {
    const newFilament: Filament = {
      ...values,
      id: crypto.randomUUID(),
      status: "available",
    };

    setFilaments([...filaments, newFilament]);
    setIsAddEditDialogOpen(false);
    toast.success("Filament has been added");
  };

  const editFilament = (filament: Filament) => {
    setAddEditFilament(filament);
    setIsAddEditDialogOpen(true);
  };

  const handleEditFilament = (
    values: Omit<Filament, "id" | "status"> &
      Partial<Pick<Filament, "id" | "status">>
  ) => {
    const updatedFilament: Filament = {
      ...values,
      id: addEditFilament?.id || "",
      status: addEditFilament?.status || "available",
    };

    setFilaments(
      filaments.map((filament) =>
        filament.id === addEditFilament?.id ? updatedFilament : filament
      )
    );
    setIsAddEditDialogOpen(false);
    toast.success("Filament has been updated");
  };

  const deleteFilament = (id: string) => {
    setFilaments(filaments.filter((filament) => filament.id !== id));
    setIsAddEditDialogOpen(false);
    toast.success("Filament has been deleted");
  };

  const markAsFinished = (id: string) => {
    setFilaments(
      filaments.map((filament) =>
        filament.id === id ? { ...filament, status: "finished" } : filament
      )
    );
    toast.success("Filament has been marked as finished");
  };

  const restock = (id: string) => {
    setFilaments(
      filaments.map((filament) =>
        filament.id === id ? { ...filament, status: "available" } : filament
      )
    );
    toast.success("Filament has been restocked");
  };

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      setFilaments(exampleFilaments);
      return;
    }

    setFilaments(
      exampleFilaments.filter((filament) => value.includes(filament.status))
    );
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
          <Select
            defaultValue={"available"}
            onValueChange={(value) => handleFilterChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="finished">Finished</SelectItem>
              <SelectSeparator />
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={addFilament}>
            <PlusCircle className="size-4" />
            Add Filament
          </Button>
        </div>

        <FilamentTable
          filaments={filaments}
          onEdit={editFilament}
          onDelete={deleteFilament}
          onMarkAsFinished={markAsFinished}
          onRestock={restock}
        />
      </div>

      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {addEditFilament ? "Edit Filament" : "Add New Filament"}
            </DialogTitle>
          </DialogHeader>
          <AddEditFilamentForm
            filament={addEditFilament}
            brands={brands}
            onSubmit={addEditFilament ? handleEditFilament : handleAddFilament}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
