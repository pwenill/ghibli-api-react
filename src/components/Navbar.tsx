import clsx from "clsx";
import { NavLink } from "react-router";

export default function Navbar() {
  const links = [
    {
      href: "/",
      name: "Acceuil",
    },
    {
      href: "/favorites",
      name: "Favoris",
    },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <span className="nav-logo nav-brand">Studio Ghibli</span>
        <div className="nav-links">
          {links.map((link, i) => {
            return (
              <NavLink
                key={i}
                to={link.href}
                className={({ isActive }) =>
                  clsx("nav-link", isActive && "active")
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
