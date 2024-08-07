import { ThemeContext } from "@contexts/theme";
import React from "react";

const useTheme = () => React.useContext(ThemeContext);

export default useTheme;