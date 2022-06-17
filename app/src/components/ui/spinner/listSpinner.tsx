import { FC } from "react";
import { Spinner } from ".";

export const ListSpinner: FC = () => {
  return (
    <div
      style={{
        marginTop: "30px",
        fontSize: "2rem",
        color: "#5cb85c",
        textAlign: "center",
      }}
    >
      <Spinner />
    </div>
  );
};
