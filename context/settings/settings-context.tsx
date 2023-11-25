import { createContext } from "react";

export const defaultSettings: Settings = {
  responsiveFontSizes: false,
  colorPreset: "indigo",
  contrast: "normal",
  paletteMode: "light",
};

export const initialState: State = {
  isInitialized: false,
  openDrawer: false,
};

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  ...initialState,
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false,
});
