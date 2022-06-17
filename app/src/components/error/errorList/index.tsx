import { FC } from "react";
import { GenericResError, ResError, UnexpectedResError } from "types/error";

interface ErrorListProps {
  error: ResError | null;
}

export const ErrorList: FC<ErrorListProps> = ({ error }) => {
  if (!error) return null;

  const { status, message, data } = error;
  const unErrData = data as UnexpectedResError;
  const genErrData = data as GenericResError;

  let content;
  switch (status) {
    case 401:
      content = <pre>{unErrData.message}</pre>;
      break;
    case 403:
    case 422:
      content = Object.entries(genErrData.errors).map(([type, messages]) => {
        return (
          <pre style={{ color: "#ef5350" }} key={type}>
            {type} {messages}
          </pre>
        );
      });
      break;

    default:
      content = `${status} ${message}`;
      break;
  }

  return (
    <div style={{ color: "#ef5350" }}>
      <span style={{ color: "#ef5350" }}>There was an error: </span>
      {content}
    </div>
  );
};
