import React, { useState } from "react";
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderNavTest({ children, navItems }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem",
                width: "100%",
            }}
        >
            {/* Hamburger Menu Button for Small Screens */}
            <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: "block", md: "none" },
                color:"#ffffff",
                fill:"#ffffff" }}
            >
                <MenuIcon />
            </IconButton>

            {/* Navigation Links for Larger Screens */}
            <Box
                component="ul"
                sx={{
                    display: { xs: "none", md: "flex" },
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    gap: 1,
                }}
            >
                {navItems.map((link) => (
                    <Box component="li" key={link.href}>
                        <a
                            href={link.href}
                            
                        >
                            {link.name}
                        </a>
                    </Box>
                ))}
            </Box>

            {/* Drawer for Small Screens */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": { width: 200, 
                                            marginTop: '75px',
                                            //maxHeight: "100%", // Ensure it doesn't overflow the screen
                                            //height: "auto", // Automatically adjusts to the content height },
                                            backgroundColor:"#f5f5f5",
                                            padding: "2px"}
                    
                }}
            >
                <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    {navItems.map((link) => (
                        <ListItem button key={link.href}
                        sx={{
                            //paddingTop: "0.5px", // Remove padding for full-width effect
                            //paddingLeft: "0px", 
                            //paddingRight: "0px", 
                            padding:'4px'
                        }}>
                            <ListItemText
                                primary={
                                    <a
                                        href={link.href}
                                        className="header-drawer-small-screens"
                                        
                                    >
                                        {link.name}
                                    </a>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Children (Optional Extra Content) */}
            {children}
        </Box>
    );
}

