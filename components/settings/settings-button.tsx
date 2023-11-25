import type { FC } from "react";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, ButtonBase, SvgIcon, Tooltip } from "@mui/material";

interface SettingsButtonProps {
  onClick?: () => void;
}

export const SettingsButton: FC<SettingsButtonProps> = (props) => (
  <Tooltip title="Settings">
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "50%",
        bottom: 0,
        boxShadow: 16,
        margin: (theme) => theme.spacing(4),
        position: "fixed",
        right: 0,
        zIndex: (theme) => theme.zIndex.speedDial,
      }}
      {...props}
    >
      <ButtonBase
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "50%",
          color: "primary.contrastText",
          p: "10px",
        }}
      >
        <SvgIcon>
          <SettingsIcon />
        </SvgIcon>
      </ButtonBase>
    </Box>
  </Tooltip>
);

SettingsButton.propTypes = {
  onClick: PropTypes.func,
};
