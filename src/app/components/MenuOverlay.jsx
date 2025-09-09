import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, closeMenu, snowEnabled, setSnowEnabled }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <div onClick={closeMenu}>
            <NavLink href={link.path} title={link.title} />
          </div>
        </li>
      ))}
      <li className="mt-4">
        <button
          onClick={() => setSnowEnabled(!snowEnabled)}
          className="cursor-pointer group"
        >
          <div
            className={`
            w-8 h-8 rounded border-2 bg-black
            flex items-center justify-center
            transition-all duration-300
            hover:border-white
            ${snowEnabled ? "border-white" : "border-[#ADB7BE]"}
          `}
          >
            {/* Snowflake icon - 7x7 grid */}
            <div className="relative w-[18px] h-[18px]">
              {[
                4, 9, 11, 13, 17, 19, 22, 23, 25, 27, 28, 31, 33, 37, 39, 41,
                46,
              ].map((position, index) => {
                // Convert position number to row,col in 7x7 grid
                const row = Math.ceil(position / 7);
                const col = position - (row - 1) * 7;
                return (
                  <div
                    key={index}
                    className={`
                    absolute
                    transition-colors duration-300
                    ${snowEnabled ? "bg-white" : "bg-gray-500 group-hover:bg-white"}
                  `}
                    style={{
                      width: "2.5px",
                      height: "2.5px",
                      left: `${(col - 1) * 2.5}px`,
                      top: `${(row - 1) * 2.5}px`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </button>
      </li>
    </ul>
  );
};

export default MenuOverlay;
