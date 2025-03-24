"use client";

import {
  Edit,
  MoreVertical,
  RefreshCw,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { Filament } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  filaments: Filament[];
  onEdit: (filament: Filament) => void;
  onDelete: (id: string) => void;
  onMarkAsFinished: (id: string) => void;
  onRestock: (id: string) => void;
}

export default function FilamentTable({
  filaments,
  onEdit,
  onDelete,
  onMarkAsFinished,
  onRestock,
}: Props) {
  console.log(filaments);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Spool Size (kg)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filaments.map((filament) => (
            <TableRow
              key={filament.id}
              className={
                filament.status === "finished" ? "opacity-70 bg-muted/20" : ""
              }
            >
              <TableCell className="font-medium">{filament.brand}</TableCell>
              <TableCell>{filament.type}</TableCell>
              <TableCell>{filament.color}</TableCell>
              <TableCell>{(filament.spoolSize / 1000).toFixed(1)} kg</TableCell>
              <TableCell>
                <Badge
                  variant={
                    filament.status === "available" ? "default" : "secondary"
                  }
                >
                  {filament.status === "available" ? "Available" : "Finished"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(filament.stockDate).toDateString()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="size-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(filament)}>
                      <Edit className="mr-2 size-4" />
                      Edit
                    </DropdownMenuItem>
                    {filament.status === "available" ? (
                      <DropdownMenuItem
                        onClick={() => onMarkAsFinished(filament.id)}
                      >
                        <CheckCircle className="mr-2 size-4" />
                        Mark as Finished
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onRestock(filament.id)}>
                        <RefreshCw className="mr-2 size-4" />
                        Restock
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete(filament.id)}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
