import { Box, IconButton, SpeedDialIcon } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export default function Topbar() {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SpeedDialIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <SpeedDialIcon />
        </IconButton>
        <IconButton>
          <SpeedDialIcon />
        </IconButton>
        <IconButton>
          <SpeedDialIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
