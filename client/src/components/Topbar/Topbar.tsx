import {
  NotificationsOutlined,
  PersonOutlineOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export default function Topbar() {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlined />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlineOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}
