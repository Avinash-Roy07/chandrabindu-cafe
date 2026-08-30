import React, { Component, useContext } from "react";

import _ from "lodash";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import {
  createSearchParams,
  Link,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";

import burgerIcon from "../assets/icons/burger-menu-left.svg";
import chatIcon from "../assets/icons/chat.svg";
import placeholderProfile from "../assets/images/placeholder-profile.jpg";
import logo from "../assets/chandrabindu-logo.png";
import { contextAct } from "../redux/slices/context.slice";
import { profileAction } from "../redux/slices/profile.slice";
import { uinfoAct } from "../redux/slices/userInfo.slice";
import { getUserData, isAuthenticated } from "../utils/authUtils";
import withSearchParams from "../utils/wrappers/withSearchParams.js";
import Logout from "./Logout";
import Sidebar from "./Sidebar";

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  assignToken: () => dispatch(uinfoAct.assignToken()),
  dismissToken: () => dispatch(uinfoAct.dismissToken()),
  getProfile: (token, controller) =>
    dispatch(profileAction.getProfileThunk({ token, controller })),
  openLogout: () => dispatch(contextAct.openLogout()),
});

// create a navigation component that wraps the burger menu
const Navigation = () => {
  const ctx = useContext(MyContext);

  return (
    <Sidebar
      customBurgerIcon={false}
      isOpen={ctx.isMenuOpen}
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    />
  );
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isNavbarOpen: false,
      redirectLogout: false,
      isSearchOpen: false,
      inputSearch: "",
    };
    this.dropdownRef = React.createRef();
    this.searchRef = React.createRef();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickOutsideSearch = this.handleClickOutsideSearch.bind(this);
  }
  navigateTo(path) {
    const navigate = useNavigate();
    navigate(path);
  }

  componentDidMount() {
    const query = this.props.searchParams.get("q");
    // console.log(query);
    // if (query) {
    this.setState((prevState) => ({
      ...prevState,
      inputSearch: query || "",
    }));
    // }
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("click", this.handleClickOutsideSearch);
    // console.log(jwtDecode(this.props.userInfo.token));
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  }

  toggleNavbar = () => {
    this.setState((prevState) => ({
      isNavbarOpen: !prevState.isNavbarOpen,
    }));
  };

  limitCharacters(str) {
    if (str.length > 20) {
      return str.substring(0, 20) + "...";
    }
    return str;
  }

  logoutHandler = () => {
    toast.dismiss();
    this.props.openLogout();
    // toast.promise(
    //   logoutUser(this.props.userInfo.token).then((res) => {
    //     return res.data;
    //   }),
    //   {
    //     loading: "Please wait",
    //     success: () => {
    //       this.setState({ ...this.state, redirectLogout: true });
    //       this.props.dismissToken();
    //       return "Logout has been successful! See ya!";
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       return "Something went wrong, please reload your page!";
    //     },
    //   }
    // );
  };

  handleClickOutside(event) {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.setState({
        isDropdownOpen: false,
      });
    }
  }

  handleClickOutsideSearch(event) {
    if (
      this.searchRef.current &&
      !this.searchRef.current.contains(event.target) &&
      !event.target.closest('.search-toggle-btn')
    ) {
      this.setState({ isSearchOpen: false });
    }
  }

  render() {
    return (
      <>
        <Logout />
        <div
          className={`${
            this.state.isNavbarOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[45] transition-opacity duration-300 ease-in-out`}
          onClick={this.toggleNavbar}
        ></div>
        <div
          className={`${
            this.state.isNavbarOpen ? "translate-x-0" : "translate-x-full"
          } transform h-full w-72 max-w-[85vw] bg-white fixed top-0 right-0 z-[60] transition-transform duration-300 ease-in-out`}
        >
          <Sidebar onClose={this.toggleNavbar} />
        </div>
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
          <div className="flex global-px justify-between items-center h-16">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} alt="logo" className="h-16 w-auto" />
            </Link>
            {/* Mobile right controls */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                type="button"
                onClick={() => this.setState((p) => ({ isSearchOpen: !p.isSearchOpen }))}
                className="search-toggle-btn p-1.5 text-gray-500 hover:text-[#6A4029] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={this.toggleNavbar} className="p-1">
                <img src={burgerIcon} width="26px" className="aspect-square" alt="menu" />
              </button>
            </div>
            <nav className="hidden lg:flex flex-row gap-8 items-center">
              <li className="list-none" key="Home Page">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "font-bold text-[#6A4029]" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="list-none" key="Product">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "font-bold text-[#6A4029]" : ""
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="list-none" key="Cart">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "font-bold text-[#6A4029]" : ""
                  }
                >
                  Your Cart
                </NavLink>
              </li>
              <li className="list-none" key="History">
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive ? "font-bold text-[#6A4029]" : ""
                  }
                >
                  History
                </NavLink>
              </li>
            </nav>
            {isAuthenticated() ? (
              <div className="flex-row gap-6 hidden lg:flex select-none items-center">
                <div
                  ref={this.searchRef}
                  className="search-section cursor-pointer relative"
                  onClick={() =>
                    this.setState((prevState) => ({
                      ...prevState,
                      isSearchOpen: !prevState.isSearchOpen,
                    }))
                  }
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                      stroke="#4F5665"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {this.state.isSearchOpen && (
                    <nav
                      className="absolute list-none bg-white rounded-lg shadow-md border-1 border-gray-200 flex flex-col right-0 top-10 py-2 divide-y-1 transition-all duration-200 transform origin-top-right min-w-[14rem]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          // this.props.setSearchParams({
                          //   q: this.state.inputSearch,
                          // });
                          // this.props.navigate("/products");
                          this.props.navigate({
                            pathname: "/products",
                            search: createSearchParams({
                              q: this.state.inputSearch,
                            }).toString(),
                          });
                        }}
                        className="group flex gap-2"
                      >
                        <input
                          value={this.state.inputSearch}
                          onChange={(e) =>
                            this.setState((prevState) => ({
                              ...prevState,
                              inputSearch: e.target.value,
                            }))
                          }
                          placeholder="Search product here..."
                          className="border outline-none focus:border-tertiary px-2 py-2 mx-2 rounded-lg text-sm"
                          required
                        />
                        <button type="submit" className="mr-4">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                              stroke="#4F5665"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </form>
                    </nav>
                  )}
                </div>
                <a href="" className="relative">
                  <div className="absolute -left-2 -top-2 h-4 w-4 bg-tertiary rounded-full text-white flex text-[0.70rem] items-center justify-center font-extrabold">
                    9+
                  </div>
                  <img src={chatIcon} alt="" width="30px" />
                </a>
                <div
                  className="relative flex items-center my-auto"
                  ref={this.dropdownRef}
                  onClick={this.toggleDropdown}
                >
                  <div className=" flex items-center  cursor-pointer">
                    <div className="avatar">
                      <div className="w-9 rounded-full">
                        <img
                          src={
                            this.props?.profile?.data?.img
                              ? this.props.profile.data.img
                              : placeholderProfile
                          }
                        />
                      </div>
                    </div>
                    {/* <img
                      src={
                        this.props?.profile?.data?.img
                          ? this.props.profile.data.img
                          : placeholderProfile
                      }
                      alt=""
                      width="32px"
                      className="rounded-full"
                    /> */}
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className={`dropdown ${
                      this.state.isDropdownOpen
                        ? "transition duration-300 ease-in-out opacity-100 transform -translate-y-6"
                        : "transition duration-200 ease-in-out opacity-0 transform -translate-y-10 invisible"
                    }`}
                  >
                    {this.state.isDropdownOpen && (
                      <nav className="absolute list-none bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col right-0 top-12 py-2 z-50 min-w-[13rem] max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-1">
                          <p>Signed in as</p>
                          <p className="font-medium">
                            {this.limitCharacters(getUserData().email)}
                          </p>
                        </div>
                        <div className="py-1">
                          <NavLink
                            className="block px-4 py-2 hover:bg-gray-100  duration-200"
                            to="/profile/"
                          >
                            Profile
                          </NavLink>
                          {/* <a
                          className="block px-4 py-2 hover:bg-gray-100 duration-200"
                          href="#"
                        >
                          My Cart
                        </a> */}
                        </div>
                        {Number(this.props.userInfo.role) > 1 && (
                          <div className="py-1">
                            <NavLink
                              className="block px-4 py-2 hover:bg-gray-100  duration-200"
                              to="/admin"
                            >
                              Admin Dashboard
                            </NavLink>
                            <NavLink
                              className="block px-4 py-2 hover:bg-gray-100  duration-200"
                              to="/manage-order"
                            >
                              Manage Order
                            </NavLink>
                            <NavLink
                              className="block px-4 py-2 hover:bg-gray-100  duration-200"
                              to="/products/new"
                            >
                              Add Product
                            </NavLink>
                            <NavLink
                              className="block px-4 py-2 hover:bg-gray-100  duration-200"
                              to="/promo/new"
                            >
                              Add Promo
                            </NavLink>
                          </div>
                        )}
                        <div className="py-1">
                          <a
                            className="block px-4 py-2 hover:bg-gray-100 duration-200 cursor-pointer"
                            onClick={this.logoutHandler}
                          >
                            Sign out
                          </a>
                        </div>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-row gap-3 items-center select-none">
                <Link to="/auth/login" className="font-semibold text-gray-700 hover:text-[#6A4029] transition-colors">
                  Login
                </Link>
                <Link to="/auth/register">
                  <button className="rounded-full bg-[#F5C518] px-6 text-[#6A4029] font-bold py-2 hover:bg-[#e6b800] transition-colors duration-200">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Full-width search bar — slides down below navbar on mobile */}
        {this.state.isSearchOpen && (
          <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-gray-100 shadow-lg px-4 py-3" ref={this.searchRef}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (this.state.inputSearch.trim()) {
                  this.props.navigate({
                    pathname: "/products",
                    search: createSearchParams({ q: this.state.inputSearch }).toString(),
                  });
                  this.setState({ isSearchOpen: false, inputSearch: "" });
                }
              }}
            >
              <div className="flex items-center gap-2 bg-gray-50 border-2 border-[#6A4029]/30 focus-within:border-[#6A4029] rounded-2xl px-4 py-2.5 transition-all duration-200">
                <svg width="18" height="18" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 shrink-0">
                  <path d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  autoFocus
                  value={this.state.inputSearch}
                  onChange={(e) => this.setState({ inputSearch: e.target.value })}
                  placeholder="Search coffee, food, drinks..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                />
                {this.state.inputSearch && (
                  <button type="button" onClick={() => this.setState({ inputSearch: "" })} className="text-gray-400 hover:text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                )}
                <button type="submit" className="bg-[#6A4029] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#8B5E3C] transition-colors shrink-0">
                  Search
                </button>
              </div>
            </form>

            {/* Suggestions dropdown */}
            {this.state.inputSearch.trim().length > 0 && (() => {
              const ALL_ITEMS = [
                { name: "Hazelnut Latte", category: "Coffee", price: "IDR 25.000", emoji: "☕", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=60&h=60&fit=crop" },
                { name: "Cappuccino", category: "Coffee", price: "IDR 28.000", emoji: "☕", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=60&h=60&fit=crop" },
                { name: "Espresso Shot", category: "Coffee", price: "IDR 18.000", emoji: "☕", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=60&h=60&fit=crop" },
                { name: "Caramel Macchiato", category: "Coffee", price: "IDR 33.000", emoji: "☕", img: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=60&h=60&fit=crop" },
                { name: "Cold Brew", category: "Coffee", price: "IDR 30.000", emoji: "☕", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=60&h=60&fit=crop" },
                { name: "Americano", category: "Coffee", price: "IDR 20.000", emoji: "☕", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=60&h=60&fit=crop" },
                { name: "Flat White", category: "Coffee", price: "IDR 26.000", emoji: "☕", img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=60&h=60&fit=crop" },
                { name: "Mocha Latte", category: "Coffee", price: "IDR 29.000", emoji: "☕", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=60&h=60&fit=crop" },
                { name: "Matcha Latte", category: "Non Coffee", price: "IDR 30.000", emoji: "🍵", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=60&h=60&fit=crop" },
                { name: "Strawberry Smoothie", category: "Non Coffee", price: "IDR 29.000", emoji: "🍓", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=60&h=60&fit=crop" },
                { name: "Chocolate Frappe", category: "Non Coffee", price: "IDR 32.000", emoji: "🍫", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=60&h=60&fit=crop" },
                { name: "Taro Milk Tea", category: "Non Coffee", price: "IDR 27.000", emoji: "🧋", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop" },
                { name: "Mango Juice", category: "Non Coffee", price: "IDR 22.000", emoji: "🥭", img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=60&h=60&fit=crop" },
                { name: "Veggie Tomato Mix", category: "Foods", price: "IDR 34.000", emoji: "🥗", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=60&h=60&fit=crop" },
                { name: "Salty Rice", category: "Foods", price: "IDR 32.000", emoji: "🍚", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=60&h=60&fit=crop" },
                { name: "Chicken Wings", category: "Foods", price: "IDR 45.000", emoji: "🍗", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=60&h=60&fit=crop" },
                { name: "Beef Sandwich", category: "Foods", price: "IDR 38.000", emoji: "🥪", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=60&h=60&fit=crop" },
                { name: "Grilled Salmon", category: "Foods", price: "IDR 65.000", emoji: "🐟", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=60&h=60&fit=crop" },
                { name: "Pasta Carbonara", category: "Foods", price: "IDR 42.000", emoji: "🍝", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=60&h=60&fit=crop" },
                { name: "Caesar Salad", category: "Foods", price: "IDR 29.000", emoji: "🥙", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=60&h=60&fit=crop" },
                { name: "Whipped Cream", category: "Add-on", price: "IDR 5.000", emoji: "🍦", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=60&h=60&fit=crop" },
                { name: "Caramel Drizzle", category: "Add-on", price: "IDR 6.000", emoji: "🍯", img: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=60&h=60&fit=crop" },
                { name: "Brown Sugar Boba", category: "Add-on", price: "IDR 9.000", emoji: "🧋", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop" },
              ];
              const q = this.state.inputSearch.toLowerCase();
              const filtered = ALL_ITEMS.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 6);
              if (filtered.length === 0) return (
                <div className="mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl p-4 text-center text-sm text-gray-400">
                  No results for &ldquo;{this.state.inputSearch}&rdquo;
                </div>
              );
              return (
                <div className="mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Suggestions</p>
                  {filtered.map((item, idx) => {
                    const q2 = this.state.inputSearch;
                    const idx2 = item.name.toLowerCase().indexOf(q2.toLowerCase());
                    const before = item.name.slice(0, idx2);
                    const match = item.name.slice(idx2, idx2 + q2.length);
                    const after = item.name.slice(idx2 + q2.length);
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#fdf6ec] transition-colors duration-150 text-left"
                        onClick={() => {
                          this.props.navigate({ pathname: "/products", search: createSearchParams({ q: item.name }).toString() });
                          this.setState({ isSearchOpen: false, inputSearch: "" });
                        }}
                      >
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {before}<span className="text-[#6A4029] font-bold">{match}</span>{after}
                          </p>
                          <p className="text-xs text-gray-400">{item.category} · {item.price}</p>
                        </div>
                        <span className="text-lg shrink-0">{item.emoji}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-sm text-[#6A4029] font-semibold hover:bg-[#fdf6ec] transition-colors border-t border-gray-50 text-center"
                    onClick={() => {
                      this.props.navigate({ pathname: "/products", search: createSearchParams({ q: this.state.inputSearch }).toString() });
                      this.setState({ isSearchOpen: false, inputSearch: "" });
                    }}
                  >
                    See all results for &ldquo;{this.state.inputSearch}&rdquo; →
                  </button>
                </div>
              );
            })()}
          </div>
        )}

        {this.state.redirectLogout && (
          <Navigate to="/auth/login" replace={true} />
        )}
      </>
    );
  }
}

export default withSearchParams(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
