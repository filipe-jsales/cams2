import {
  NotificationsOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { InputGroup, Button } from "react-bootstrap";

export default function Topbar() {
  return (
    <div className="d-flex justify-content-between p-2">
      <InputGroup className="search-bar" style={{ width: "250px" }}>
        <h1>NuvCam</h1>
      </InputGroup>

      <div className="d-flex align-items-center">
        <Button
          variant="link"
          className="p-1"
          style={{ backgroundColor: "transparent" }}
        >
          <SettingsOutlined sx={{ color: "#6c757d" }} />
        </Button>
        <Button
          variant="link"
          className="p-1"
          style={{ backgroundColor: "transparent" }}
        >
          <NotificationsOutlined sx={{ color: "#6c757d" }} />
        </Button>
        <Button
          variant="link"
          className="p-1"
          style={{ backgroundColor: "transparent" }}
        >
          <PersonOutlineOutlined sx={{ color: "#6c757d" }} />
        </Button>
      </div>
    </div>
  );
}
