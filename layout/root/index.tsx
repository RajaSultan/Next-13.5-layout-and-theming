"use client";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../../theme";
import { SettingsButton } from "../../components/settings/settings-button";
import { SettingsDrawer } from "../../components/settings/settings-drawer";
import Cookies from "js-cookie";
import { SettingsConsumer, SettingsProvider } from "@/context/settings";

const SETTINGS_STORAGE_KEY = "app.settings";

const resetSettings = (): void => {
  try {
    Cookies.remove(SETTINGS_STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
};

const updateSettings = (settings: Settings): void => {
  try {
    Cookies.set(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error(err);
  }
};

export function Layout(props: any) {
  const { children, settings } = props;
  return (
    <>
      <Head>
        <title>Devias Kit PRO</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SettingsProvider
        onReset={resetSettings}
        onUpdate={updateSettings}
        settings={settings}
      >
        <SettingsConsumer>
          {(settings) => {
            // Prevent theme flicker when restoring custom settings from browser storage
            if (!settings.isInitialized) {
              // return null;
            }
            const theme = createTheme({
              colorPreset: settings.colorPreset,
              contrast: settings.contrast,
              paletteMode: settings.paletteMode,
              responsiveFontSizes: settings.responsiveFontSizes,
            });

            return (
              <ThemeProvider theme={theme}>
                <Head>
                  <meta name="color-scheme" content={settings.paletteMode} />
                  <meta
                    name="theme-color"
                    content={theme.palette.neutral[900]}
                  />
                </Head>
                <>
                  {children}
                  <SettingsButton onClick={settings.handleDrawerOpen} />
                  <SettingsDrawer
                    canReset={settings.isCustom}
                    onClose={settings.handleDrawerClose}
                    onReset={settings.handleReset}
                    onUpdate={settings.handleUpdate}
                    open={settings.openDrawer}
                    values={{
                      colorPreset: settings.colorPreset,
                      contrast: settings.contrast,
                      paletteMode: settings.paletteMode,
                      responsiveFontSizes: settings.responsiveFontSizes,
                    }}
                  />
                </>
              </ThemeProvider>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </>
  );
}
