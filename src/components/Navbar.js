import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { faHome, faList, faCog, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ onLogout }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();

    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/recipes",
            icon: faList
        },
        {
            name: "Favorites",
            path: "/favorites",
            icon: faHeart
        },
        {
            name: "Manage Recipes",
            path: "/manage-recipes",
            icon: faPlus
        },
        {
            name: "Settings",
            path: "/settings",
            icon: faCog
        }
    ];

    function closeSidebar() {
        setShowSidebar(false);
    }

    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo">Wild<span>COOK</span>Book</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link
                            className={location.pathname === link.path ? "active" : ""}
                            to={link.path}
                            key={link.name}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {/* Logout Button with Left Margin */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onLogout}
                        sx={{ ml: "2em" }}  // 2em left margin
                    >
                        Logout
                    </Button>
                </div>
                <div
                    onClick={() => setShowSidebar(true)}
                    className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar close={closeSidebar} links={links} />}
        </>
    );
}
