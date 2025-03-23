"use client";

import FilamentTable from "@/components/filaments/table";
import { Button } from "@/components/ui/button";

import { Filament } from "@/types/filament";
import { PlusCircle } from "lucide-react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEditFilamentForm } from "@/components/filaments/add-edit";
import { BrandOption } from "@/types/brand";
import { toast } from "sonner"

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
  { value: "ESun", label: "ESun" },
  { value: "ColorFabb", label: "ColorFabb" },
  { value: "Prusament", label: "Prusament" },
];

export default function Home() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [filaments, setFilaments] = useState<Filament[]>(exampleFilaments);

  const handleAddFilament = (values: Omit<Filament, "id" | "status"> & Partial<Pick<Filament, "id" | "status">>) => {
    const newFilament: Filament = {
      ...values,
      id: crypto.randomUUID(),
      status: "available",
    };

    setFilaments([...filaments, newFilament]);
    setIsAddDialogOpen(false);
    toast.success('Filament has been added')
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="size-4" />
                Add Filament
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Filament</DialogTitle>
              </DialogHeader>
              <AddEditFilamentForm
                filament={null}
                brands={brands}
                onSubmit={handleAddFilament}
              />
            </DialogContent>
          </Dialog>
        </div>

        <FilamentTable
          filaments={filaments}
          onEdit={() => {}}
          onDelete={() => {}}
          onMarkAsFinished={() => {}}
          onRestock={() => {}}
        />
      </div>
    </>
  );
}
