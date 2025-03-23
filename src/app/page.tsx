'use client'

import { Header } from "@/components/header";
import FilamentTable from "@/components/filaments/table";

import { Filament } from "@/types/filament";
const filaments: Filament[] = [
  {
    id: "1",
    brand: "ESun",
    type: "PLA",
    color: "Black",
    spoolSize: 1000,
    status: "available",
  },
  {
    id: "2",
    brand: "ESun",
    type: "PLA",
    color: "White",
    spoolSize: 1000,
    status: "available",
  },
  {
    id: "3",
    brand: "ESun",
    type: "ABS",
    color: "Black",
    spoolSize: 1000,
    status: "finished",
  },
  {
    id: "4",
    brand: "ColorFabb",
    type: "XT",
    color: "NinjaFlex",
    spoolSize: 500,
    status: "available",
  },
  {
    id: "5",
    brand: "Prusament",
    type: "PLA",
    color: "Galaxy Blue",
    spoolSize: 1000,
    status: "available",
  },
  {
    id: "6",
    brand: "Prusament",
    type: "PETG",
    color: "Galaxy Blue",
    spoolSize: 1000,
    status: "finished",
  },
  {
    id: "7",
    brand: "Prusament",
    type: "ASA",
    color: "Galaxy Blue",
    spoolSize: 1000,
    status: "available",
  },
  {
    id: "8",
    brand: "Prusament",
    type: "ASA",
    color: "Galaxy Black",
    spoolSize: 1000,
    status: "finished",
  },
];


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl py-10">
        <FilamentTable filaments={filaments} onEdit={() => {}} onDelete={() => {}} onMarkAsFinished={() => {}} onRestock={() => {}} />
      </div>
    </main>
  );
}
