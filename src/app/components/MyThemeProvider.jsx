"use client";
import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

function MyThemeProvider({ children, ...props }) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

export default MyThemeProvider;
