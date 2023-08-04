import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./navigation.css";
import { useCart } from "../../Providers/CartProvider";
import { useAuth } from "../../Providers/AuthProvider";

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <div>Milad shopping</div>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              home
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="cartLink">
            <NavLink to="/cart" activeClassName="activeLink">
              cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li>
            <NavLink
              to={userData ? "/profile" : "/login"}
              activeClassName="activeLink"
            >
              {userData ? "profile" : "login/signup"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
