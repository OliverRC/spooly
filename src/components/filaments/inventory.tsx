'use client'

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

import { Filament, BrandOption, AddFilament, UpdateFilament } from "@/types";
import { PlusCircle } from "lucide-react";

import { useState } from "react";

import { 
  addFilament as addFilamentAction, 
  deleteFilament as deleteFilamentAction, 
  markAsFinished as markAsFinishedAction, 
  restock as restockAction, 
  updateFilament as updateFilamentAction 
} from "@/app/filaments/actions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddEditFilamentForm } from "@/components/filaments/add-edit";
import { toast } from "sonner";

export default function FilamentInventory({
  brands,
  filaments
}: {
  brands: BrandOption[];
  filaments: Filament[];
}) {
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [addEditFilament, setAddEditFilament] = useState<Filament | null>(null);

  const [visibleFilaments, setVisibleFilaments] = useState<Filament[]>(filaments.filter((filament) => filament.status === "available"));

  const addFilament = () => {
    setAddEditFilament(null);
    setIsAddEditDialogOpen(true);
  };

  const handleAddFilament = async (
    values: AddFilament
  ) => {
    try {
      await addFilamentAction(values);
      setIsAddEditDialogOpen(false);
      toast.success("Filament has been added");
    } catch (error) {
      toast.error("Failed to add filament");
    }
  };

  const editFilament = (filament: Filament) => {
    setAddEditFilament(filament);
    setIsAddEditDialogOpen(true);
  };

  const handleEditFilament = async (
    values: UpdateFilament
  ) => {
    try {
      await updateFilamentAction(values);
      setIsAddEditDialogOpen(false);
      toast.success("Filament has been updated");
    } catch (error) {
      toast.error("Failed to update filament");
    }
  };

  const deleteFilament = async (id: string) => {
    try {
      await deleteFilamentAction(id);
      setVisibleFilaments(visibleFilaments.filter(filament => filament.id !== id));
      setIsAddEditDialogOpen(false);
      toast.success("Filament has been deleted");
    } catch (error) {
      toast.error("Failed to delete filament");
    }
  };

  const markAsFinished = async (id: string) => {
    try {
      await markAsFinishedAction(id);
      setVisibleFilaments(
        filaments.map((filament) =>
          filament.id === id ? { ...filament, status: "finished" } : filament
        )
      );
      toast.success("Filament has been marked as finished");
    } catch (error) {
      toast.error("Failed to mark filament as finished");
    }
  };

  const restock = async (id: string) => {
    try {
      await restockAction(id);
      setVisibleFilaments(
        filaments.map((filament) =>
          filament.id === id ? { ...filament, status: "available" } : filament
        )
      );
      toast.success("Filament has been restocked");
    } catch (error) {
      toast.error("Failed to restock filament");
    }
  };

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      setVisibleFilaments(filaments);
      return;
    }

    setVisibleFilaments(
      filaments.filter((filament) => value.includes(filament.status))
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
          filaments={visibleFilaments}
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
            onAdd={handleAddFilament}
            onUpdate={handleEditFilament}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
