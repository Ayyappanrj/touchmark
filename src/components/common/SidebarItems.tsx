import { ListItemButton, ListItemIcon } from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import colorConfigs from "../../configs/colorConfigs";
import { Link, useLocation } from "react-router-dom";

const appRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        layout: "dashboard",
        icon: <DashboardOutlinedIcon />,
    },
    {
        path: "/users",
        name: "Users",
        layout: "users",
        icon: <GroupOutlinedIcon />,
    },
    {
        path: "/new-transaction",
        name: "New Transaction",
        layout: "new-transaction",
        icon: <ReceiptLongOutlinedIcon />,
    },
    {
        path: "/view-transaction",
        name: "View Transaction",
        layout: "view-transaction",
        icon: <AccountBalanceOutlinedIcon />,
    },
    {
        path: "/multivalue-form",
        name: "Multivalue Form",
        layout: "multivalue-form",
        icon: <FileCopyOutlinedIcon />,
    },
]

const SidebarItems = () => {

    const location = useLocation();

    return (
        <>
        { appRoutes.map((route: any, i: any) => (
            <ListItemButton
                key={`menu${i}`}
                className={`${ route.path === location.pathname ? 'active' : ''}`}
                component={Link}
                to={route.path}
                sx={{
                    "&: hover": {
                        backgroundColor: colorConfigs.sidebar.hoverBg,
                    },
                    "&.active": {
                        backgroundColor: colorConfigs.sidebar.activeBg,
                    },
                    paddingY: "20px",
                    paddingX: "24px"
                }}
            >
                <ListItemIcon 
                    sx={{
                        color: colorConfigs.sidebar.color
                    }}
                >
                    {route.icon}
                </ListItemIcon>
                {route.name}
            </ListItemButton>
            ))
        }
        </>
    )
}

export default SidebarItems;