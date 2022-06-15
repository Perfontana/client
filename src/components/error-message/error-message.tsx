import { Typography } from "antd";
import { FieldError } from "react-hook-form";

interface ErrorMessageProps<T> {
  error: Partial<Record<keyof T, FieldError | undefined>>;
  field: keyof T;
}

export function ErrorMessage<T>({ error, field }: ErrorMessageProps<T>) {
  return (
    <Typography.Text style={{ width: "100%" }} className="error-message">
      {error[field] && error[field]!.message}
    </Typography.Text>
  );
}
