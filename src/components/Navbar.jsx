import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <NavigationMenu className="bg-blue-400 flex justify-between items-center">
      <NavigationMenuList className="">
        <NavigationMenuItem>
          {/* Logo */}
          <Link to="/">
            <img src="/path/to/logo.png" alt="Logo" className="h-10" />
          </Link>
        </NavigationMenuItem>
        {/* Navigation Links */}
        <NavigationMenuItem>
          <NavigationMenuLink as={Link} to="/forum">
            Forum
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink as={Link} to="/profile">
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem className="">
          <NavigationMenuLink as={Link} to="/signout">
            Signout
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
