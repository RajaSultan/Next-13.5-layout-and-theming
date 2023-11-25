type Layout = "horizontal" | "vertical";

type NavColor = "blend-in" | "discrete" | "evident";

interface Settings {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
}

interface State extends Settings {
  openDrawer: boolean;
  isInitialized: boolean;
}

interface SettingsContextType extends State {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  handleReset: () => void;
  handleUpdate: (settings: Settings) => void;
  isCustom: boolean;
}
