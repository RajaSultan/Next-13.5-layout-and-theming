import { useContext } from "react";
import { SettingsContext } from "../context/settings/settings-context";

export const useSettings = () => useContext(SettingsContext);
