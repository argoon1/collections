import styles from "./backgroundTheme.module.css";
import { useTheme } from "../../Context/themeProvider/ThemeProvider";

const BackgroundTheme = () => {
  const { theme } = useTheme();
  return <div className={theme === "dark" ? styles.darkMode : ""} />;
};

export { BackgroundTheme };
