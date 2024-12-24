import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRegListAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { faShoppingCart, faHome, faListAlt, faTags, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import Logout from '../../page/Logout/Logout';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { BsCart4 } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useWishlist from '../../hooks/usewishlist';

const Navbar = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [wishlist] = useWishlist();

  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredList, setIsHoveredList] = useState(false);
  const [isHoveredOffer, setIsHoveredOffer] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);
  const [isHoveredWishlist, setIsHoveredWishlist] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = (setHoverState) => setHoverState(true);
  const handleMouseLeave = (setHoverState) => setHoverState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navlink = (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 text-lg justify-center my-4">
      <li>
        <NavLink to="/" className="block lg:inline">
          <div
            className={`flex items-center text-gray-700`}
            onMouseEnter={() => handleMouseEnter(setIsHoveredHome)}
            onMouseLeave={() => handleMouseLeave(setIsHoveredHome)}
          >
            {isHoveredHome ? (
              <FontAwesomeIcon icon={faHome} size="lg" className="mr-2" />
            ) : (
              <BiHomeAlt2 className="mr-2" />
            )}
            <p className="text-base font-bold m-2">Home</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/products">
          <div
            className={`flex items-center text-gray-700`}
            onMouseEnter={() => handleMouseEnter(setIsHoveredList)}
            onMouseLeave={() => handleMouseLeave(setIsHoveredList)}
          >
            {isHoveredList ? (
              <FontAwesomeIcon icon={faListAlt} size="lg" className="mr-2" />
            ) : (
              <FaRegListAlt className="mr-2" />
            )}
            <p className="text-base font-bold m-2">Products</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/offer">
          <div
            className={`flex items-center text-gray-700`}
            onMouseEnter={() => handleMouseEnter(setIsHoveredOffer)}
            onMouseLeave={() => handleMouseLeave(setIsHoveredOffer)}
          >
            {isHoveredOffer ? (
              <FontAwesomeIcon icon={faTags} size="lg" className="mr-2" />
            ) : (
              <MdOutlineLocalOffer className="mr-2" />
            )}
            <p className="text-base font-bold m-2">Special Offers</p>
          </div>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="p-4 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h2 className="text-3xl font-extrabold text-center text-gray-900">OCS</h2>
          </Link>

          {/* Hamburger Menu for Small Screens */}
          <button
            className="lg:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:space-x-4`}
          >
            {navlink}
          </div>

          {/* Sign in, Cart, and Wishlist */}
          <div className="flex items-center space-x-4">
            <Link to="/profile/cart">
              <div
                className={`flex items-center text-gray-700 hover:font-bold`}
                onMouseEnter={() => handleMouseEnter(setIsHoveredCart)}
                onMouseLeave={() => handleMouseLeave(setIsHoveredCart)}
              >
                <span>
                  {isHoveredCart ? (
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  ) : (
                    <BsCart4 size={25} />
                  )}
                </span>
                :{cart.length}
              </div>
            </Link>

            <Link to="/profile/wishlist">
              <div
                className={`flex items-center text-gray-700 hover:font-bold`}
                onMouseEnter={() => handleMouseEnter(setIsHoveredWishlist)}
                onMouseLeave={() => handleMouseLeave(setIsHoveredWishlist)}
              >
                <span>
                  {isHoveredWishlist ? (
                    <FontAwesomeIcon icon={faHeart} size="lg" />
                  ) : (
                    <AiOutlineHeart size={25} />
                  )}
                </span>
                :{wishlist.length}
              </div>
            </Link>

            <div className="dropdown dropdown-hover dropdown-end">
              <a tabIndex={0}>
                <FaRegUser size={23} />
              </a>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 rounded-box w-52"
              >
                {user ? (
                  <Logout />
                ) : (
                  <Link to="/login">
                    <li>
                      <h1>Login</h1>
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
