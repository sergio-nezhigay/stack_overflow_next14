"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { useToast } from "@/components/ui/use-toast";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";

const deleteUrl = "/assets/icons/trash.svg";
const editUrl = "/assets/icons/edit.svg";

interface EditDeleteActionProps {
  itemId: string;
  isAnswer?: boolean;
}

function EditDeleteAction({ itemId, isAnswer }: EditDeleteActionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      if (isAnswer) {
        await deleteAnswer({
          answerId: JSON.parse(itemId),
          path: pathname,
        });
      } else {
        await deleteQuestion({ questionId: itemId, path: pathname });
      }
      toast({
        description: "Your item has been deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occurred while deleting",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {!isAnswer && (
        <Button onClick={handleEdit}>
          <Image
            src={editUrl}
            width={14}
            height={14}
            alt="pencil"
            className="cursor-pointer object-contain"
          />
        </Button>
      )}
      <Button onClick={handleDelete} disabled={isSubmitting}>
        <Image
          src={deleteUrl}
          width={14}
          height={14}
          alt="Delete"
          className="cursor-pointer object-contain"
        />
      </Button>
    </div>
  );
}

export default EditDeleteAction;
