
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}

export default function AddFilamentDialog({ isAddDialogOpen, setIsAddDialogOpen }: Props) {
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Filament</DialogTitle>
      </DialogHeader>
      <div>TODO</div>
    </DialogContent>
  </Dialog>
  );
}