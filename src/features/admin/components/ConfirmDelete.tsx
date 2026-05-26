"use client";

import { Modal } from "antd";
import { Trash2 } from "lucide-react";

export const confirmDelete = ({
  title,
  description,
  okText = "Delete",
  cancelText = "Cancel",
  onOk,
}: {
  title: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
}) => {         
  Modal.confirm({
    title,
    content: description,
    okText,
    cancelText,
    okType: "danger",
    icon: <Trash2 size={18} />,
    onOk,
  });
};
