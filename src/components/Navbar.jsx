import React from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const navigate = useNavigate();
  async function signout() {
    const { error } = await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <NavigationMenu className="bg-blue-500 py-4">
      <NavigationMenuList className="justify-between items-center">
        <NavigationMenuItem className="mx-0">
          {/* Logo */}
          <Link to="/dashboard">
            <img
              src="/crypto_logo.jpeg"
              alt="Logo"
              className="h-10 rounded-full"
            />
          </Link>
        </NavigationMenuItem>
        {/* Navigation Links */}
        <NavigationMenuItem className="text-white hover:text-gray-200 px-4 py-2 rounded-md">
          <Link to="/forum">Forum</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-white hover:text-gray-200 px-4 py-2 rounded-md">
          <Link to="/profile"> Profile</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-white hover:text-gray-200 px-4 py-2 rounded-md">
          <Link to="/news">News</Link>
        </NavigationMenuItem>
        {/* Push Signout to the right */}
        <NavigationMenuItem className="text-white hover:text-gray-200 px-4 py-2 rounded-md">
          <button onClick={signout}>Signout</button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
