"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import type { AddFilament, Filament, UpdateFilament } from "@/types";
import { PlusCircle } from "lucide-react";

const filamentTypes = [
  "PLA",
  "PETG",
  "ABS",
  "TPU",
  "Nylon",
  "PVA",
  "HIPS",
  "ASA",
  "PC",
  "PLA+",
  "Other",
];

import { BrandOption } from "@/types";

const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  type: z.string().min(1, "Type is required"),
  color: z.string().min(1, "Color is required"),
  spoolSize: z.coerce.number().positive("Spool size must be positive"),
  stockDate: z.string().min(1, "Stock date is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface FilamentFormProps {
  filament?: Filament | null;
  brands: BrandOption[];
  onAdd: (values: AddFilament) => void;
  onUpdate: (values: UpdateFilament) => void;
}

export function AddEditFilamentForm({
  filament,
  brands,
  onAdd,
  onUpdate,
}: FilamentFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: filament
      ? {
          brand: filament.brand,
          type: filament.type,
          color: filament.color,
          spoolSize: filament.spoolSize,
          stockDate: filament.stockDate,
        }
      : {
          brand: "",
          type: "",
          color: "",
          spoolSize: 1000,
          stockDate: new Date(Date.now()).toISOString(),
        },
  });

  const handleSubmit = (values: FormValues) => {
    if (filament) {
      onUpdate({
        ...values,
        id: filament.id,
        status: filament.status,
        stockDate: filament.stockDate,
      });
    } else {
      onAdd(values);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.value} value={brand.value}>
                        {brand.label}
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                    <SelectItem value="add-new-brand" className="text-primary">
                      <div className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Brand
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select filament type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filamentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Galaxy Black, Fire Engine Red"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spoolSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spool Size (grams)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={250}
                    min={250}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {filament ? "Update Filament" : "Add Filament"}
          </Button>
        </form>
      </Form>
    </>
  );
}
