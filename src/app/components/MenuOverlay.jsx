import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, closeMenu }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <div onClick={closeMenu}>
            <NavLink href={link.path} title={link.title} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
