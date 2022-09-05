import styles from "./backgroundTheme.module.css";
type BackgroundThemeProps = {
  children: JSX.Element;
};
const BackgroundTheme = ({ children }: BackgroundThemeProps) => {
  return <div className={""}>{children}</div>;
};

export { BackgroundTheme };
