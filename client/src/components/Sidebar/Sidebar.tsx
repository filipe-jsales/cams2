import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AutoAwesomeMosaicOutlined,
  CameraAltOutlined,
  DashboardOutlined,
  GroupOutlined,
  MenuOutlined,
  PeopleOutlineOutlined,
  PriorityHighOutlined,
} from "@mui/icons-material";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (item: string): void => {
    setSelectedItem(item);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, to: "" },
    { text: "Users", icon: <PeopleOutlineOutlined />, to: "users" },
    { text: "Cams", icon: <CameraAltOutlined />, to: "cams" },
    { text: "Mosaics", icon: <AutoAwesomeMosaicOutlined />, to: "mosaics" },
    { text: "Groups", icon: <GroupOutlined />, to: "groups" },
    { text: "Permissions", icon: <PriorityHighOutlined />, to: "permissions" },
  ];

  return (
    <div className="d-flex">
      <div
        className={`sidebar bg-light ${isCollapsed ? "collapsed" : ""}`}
        style={{
          width: isCollapsed ? "80px" : "240px",
          transition: "width 0.3s",
        }}
      >
        <div className="d-flex align-items-center justify-content-between p-2">
          {!isCollapsed && <h6 className="m-0">NuvCam</h6>}
          <Button
            variant="link"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-0"
            style={{ color: "#6c757d" }}
          >
            <MenuOutlined />
          </Button>
        </div>

        <ListGroup variant="flush">
          {menuItems.map((item) => (
            <ListGroup.Item
              action
              as={Link}
              to={item.to}
              key={item.text}
              active={selectedItem === item.text}
              onClick={() => handleItemClick(item.text)}
              className="d-flex align-items-center"
            >
              <div className="me-2">{item.icon}</div>
              {!isCollapsed && <span>{item.text}</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
