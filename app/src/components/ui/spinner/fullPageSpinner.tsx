import { FC } from "react";
import { Spinner } from ".";

export const FullPageSpinner: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "300px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "#5cb85c",
      }}
    >
      <Spinner />
    </div>
  );
};
