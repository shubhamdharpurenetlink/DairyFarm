"use client";

import { useEffect } from "react";
import { message } from "antd";
import { onRepositoryError } from "@/services/repository";

/**
 * Mount once inside the admin shell to surface background API failures
 * from the optimistic Repository as toasts.
 */
export default function RepoErrorToaster() {
  const [api, contextHolder] = message.useMessage();

  useEffect(() => {
    return onRepositoryError((detail) => {
      const action =
        detail.op === "create"
          ? "save"
          : detail.op === "update"
            ? "update"
            : detail.op === "remove"
              ? "delete"
              : "load";
      api.error(`Failed to ${action} ${detail.resource}: ${detail.message}`);
    });
  }, [api]);

  return <>{contextHolder}</>;
}
