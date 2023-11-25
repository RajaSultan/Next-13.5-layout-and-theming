import type { FC } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Badge,
  badgeClasses,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { OptionsColorPreset } from "./options-color-preset";
import { OptionsContrast } from "./options-contrast";
import { OptionsColorScheme } from "./options-color-scheme";
import CloseIcon from "@mui/icons-material/Close";

interface SettingsDrawerProps {
  canReset?: boolean;
  onClose?: () => void;
  onReset?: () => void;
  onUpdate?: (settings: Settings) => void;
  open?: boolean;
  values?: Settings;
}

export const SettingsDrawer: FC<SettingsDrawerProps> = (props) => {
  const {
    canReset,
    onClose,
    onUpdate,
    onReset,
    open,
    values = {},
    ...other
  } = props;

  const handleFieldUpdate = useCallback(
    (field: keyof Settings, value: unknown): void => {
      onUpdate?.({
        [field]: value,
      });
    },
    [onUpdate]
  );

  return (
    <Drawer
      disableScrollLock
      anchor="right"
      onClose={onClose}
      open={open}
      ModalProps={{
        BackdropProps: {
          invisible: true,
        },
        sx: { zIndex: 1400 },
      }}
      PaperProps={{
        elevation: 24,
        sx: {
          maxWidth: "100%",
          width: 440,
        },
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          pt: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
          App Settings
        </Typography>
        <Stack alignItems="center" direction="row" spacing={0.5}>
          <Badge
            anchorOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            color="error"
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 6,
                right: 6,
                ...(!canReset && {
                  display: "none",
                }),
              },
            }}
            variant="dot"
          >
            <IconButton color="inherit" onClick={onReset}>
              <SvgIcon fontSize="small">
                <RefreshIcon />
              </SvgIcon>
            </IconButton>
          </Badge>
          <IconButton color="inherit" onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
      </Stack>
      <Stack spacing={5} sx={{ p: 3 }}>
        <OptionsColorPreset
          onChange={(value) => handleFieldUpdate("colorPreset", value)}
          value={values.colorPreset}
        />
        <OptionsColorScheme
          onChange={(value) => handleFieldUpdate("paletteMode", value)}
          value={values.paletteMode}
        />
        <OptionsContrast
          onChange={(value) => handleFieldUpdate("contrast", value)}
          value={values.contrast}
        />
      </Stack>
    </Drawer>
  );
};

SettingsDrawer.propTypes = {
  canReset: PropTypes.bool,
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  onUpdate: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  values: PropTypes.object,
};
