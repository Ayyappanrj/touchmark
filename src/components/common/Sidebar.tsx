import "./Main.css";
import { Drawer, List, Stack, Toolbar } from "@mui/material";
import sizeConfigs from "../../configs/sizeConfigs";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import SidebarItems from "./SidebarItems";


const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: sizeConfigs.sidebar.width,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: sizeConfigs.sidebar.width,
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: colorConfigs.sidebar.bg,
                    color: colorConfigs.sidebar.color
                }
            }}
        >
            <List disablePadding>
                <Toolbar sx={{
                        borderBottom: "1px solid #ffffff",
                        backgroundColor: "#ffffff"
                    }}
                >
                    <Stack
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent="center"
                    >
                        <img className="logo" src={assets.images.mainlogo} alt="" />
                    </Stack>
                </Toolbar>
                <SidebarItems />
            </List>
        </Drawer>
    )
}

export default Sidebar;