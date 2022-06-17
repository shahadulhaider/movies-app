import { Navigation } from "components/navigation/navigation";
import css from "./Header.module.css";

export const Header: React.FC = () => {
  return <header className={css.header}>{<Navigation />}</header>;
};
