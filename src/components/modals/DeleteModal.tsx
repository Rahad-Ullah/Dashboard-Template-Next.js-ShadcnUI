"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type TDeleteModalProps = {
  itemId: string;
  triggerBtn: React.ReactNode; // Button or trigger element for opening the modal
  title?: string; // Title of the modal
  description?: string; // Description text in the modal
  actionBtnText?: string; // Text for the action button
  action: (id: string) => Promise<void>; // Callback function for the action button
};

const DeleteModal = ({
  itemId,
  triggerBtn,
  title,
  description,
  actionBtnText,
  action,
}: TDeleteModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open}>
      <span onClick={() => setOpen(true)}>{triggerBtn}</span>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              "This action cannot be undone. This will permanently remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => action(itemId)}
            className="bg-red-500 hover:bg-red-700"
          >
            {actionBtnText || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
