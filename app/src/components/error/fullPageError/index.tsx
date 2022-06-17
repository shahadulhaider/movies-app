import { FC } from "react";
import { ErrorList } from "components/error/errorList";
import { ResError } from "types/error";
import css from "./FullPageError.module.css";

interface FullPageErrorProps {
  error: ResError | null;
}

export const FullPageError: FC<FullPageErrorProps> = ({ error }) => {
  return (
    <div role="alert" className={css.errors}>
      <ErrorList error={error} />
    </div>
  );
};
