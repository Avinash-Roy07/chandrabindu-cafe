import "react-loading-skeleton/dist/skeleton.css";

/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import { connect, useSelector } from "react-redux";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useDocumentTitle from "../../utils/documentTitle";
import GetAllProducts from "./GetAllProducts";

const DUMMY_PROMOS = [
  { id: 1, name: "50% Off Hazelnut Latte!", desc: "Today only — hurry before it's gone!", badge: "50%", color: "from-orange-400 to-yellow-300" },
  { id: 2, name: "Buy 1 Get 1 Free", desc: "All coffee drinks every Tuesday.", badge: "B1G1", color: "from-pink-400 to-rose-300" },
  { id: 3, name: "Save 20% Online", desc: "Use code CAFE20 at checkout.", badge: "20%", color: "from-blue-400 to-cyan-300" },
  { id: 4, name: "Flash Sale: 24 Hrs Only!", desc: "Selected foods at half price.", badge: "⚡", color: "from-purple-400 to-indigo-300" },
];

function Products(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [ddMenu, setDdmenu] = useState(false);
  const [sort, setSort] = useState(undefined);
  const [promo, setPromo] = useState([]);
  const [promoLoad, setPromoLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const controller = useMemo(() => new AbortController(), []);
  const [search, setSearch] = useState(
    searchParams.has("q") ? searchParams.get("q") : undefined
  );
  const { userInfo } = useSelector((state) => ({
    userInfo: state.userInfo,
  }));

  const toggleDdmenu = () => {
    setDdmenu(!ddMenu);
  };
  const navigate = useNavigate();

  const navigateWithParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) =>
      searchParams.set(key, value)
    );
    navigate(`${location.pathname}?${searchParams}`);
  };

  const navigateDeleteParams = (deleteParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(deleteParams).forEach(([key, value]) =>
      searchParams.delete(key)
    );
    navigate(`${location.pathname}?${searchParams}`);
  };

  const delayedSort = _.debounce((orderBy, sort) => {
    navigateWithParams({ orderBy, sort });
  }, 200);

  const delayedSearch = useCallback(
    _.debounce((q) => {
      navigateWithParams({ q });
    }, 1500),
    []
  );

  useEffect(() => {
    if (sort) {
      const currSort = sort.split("_", 2);
      delayedSort(currSort[0], currSort[1]);
    }
    return () => {};
  }, [sort]);

  useEffect(() => {
    if (search) {
      delayedSearch(search);
    } else {
      navigateDeleteParams({ q: null });
    }
  }, [search]);

  useEffect(() => {
    setPromo(DUMMY_PROMOS);
    setPromoLoad(false);
  }, []);

  useDocumentTitle(props.title);
  return (
    <>
      <Header />

      <main className="flex flex-col-reverse md:flex-row global-px">
        <section className="flex-1 flex flex-col items-center gap-5 py-5 md:border-r-2 border-solid md:pr-6">
          <h2 className="font-bold text-2xl">Promo Today</h2>
          <p className="text-center">
            Coupons will be updated every weeks.
            <br />
            Check them out!
          </p>
          <div className="flex flex-col justify-center gap-5">
            {promo.map((p, idx) => (
              <div
                key={idx}
                className={`flex flex-row items-center bg-gradient-to-r ${p.color} rounded-xl gap-3 px-4 py-4 relative shadow-md`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-extrabold text-sm text-gray-700 shadow flex-shrink-0">
                  {p.badge}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{p.name}</p>
                  <p className="text-white text-xs opacity-90">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {Number(props.userInfo.role) > 1 && (
            <div className="mt-auto flex w-full">
              <button
                onClick={() => navigate("/promo/new")}
                className="btn btn-block btn-secondary text-tertiary font-bold normal-case"
              >
                Add new promo
              </button>
            </div>
          )}
        </section>
        <section className="flex-[2_2_0%] flex flex-col md:pl-16 py-5">
          <nav className="list-none flex flex-row md:justify-between justify-evenly flex-wrap gap-5 mb-10 ">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="/products"
                end
              >
                Favorite & Promo
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/1"
              >
                Coffee
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/2"
              >
                Non Coffee
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/3"
              >
                Foods
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/4"
              >
                Add-on
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={toggleDdmenu}
                className={
                  (ddMenu ? "rotate-180" : "rotate-0") +
                  " duration-150 focus:bg-none"
                }
              >
                ▼
              </button>
              <div
                className={
                  (!ddMenu ? "opacity-0 z-0 " : " z-[5]") +
                  " absolute w-72 shadow border-1 border-gray-200 bg-white rounded-md right-0 p-5 top-10 text-primary duration-200 transition-opacity"
                }
              >
                <section className="flex flex-col">
                  <aside className="flex-1 flex flex-col">
                    <label
                      htmlFor="searchProduct"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="searchProduct"
                      id="searchProduct"
                      className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </aside>
                  <aside className="flex-1">
                    <label
                      htmlFor="orderBy"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Order by
                    </label>
                    <select
                      id="orderBy"
                      className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value={undefined}>Choose a order</option>
                      <option value="price_asc">Price (Asc)</option>
                      <option value="price_desc">Price (Desc)</option>
                      <option value="id_desc">Newest</option>
                      <option value="id_asc">Oldest</option>
                      <option value="category_asc">Category (Asc)</option>
                      <option value="category_desc">Category (Desc)</option>
                    </select>
                  </aside>
                </section>
              </div>
            </li>
          </nav>
          <Routes path="/products/*">
            <Route
              index
              element={
                <GetAllProducts
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  sort={sort}
                  setSort={setSort}
                />
              }
            ></Route>
            <Route
              path="category/:catId"
              element={
                <GetAllProducts
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  sort={sort}
                  setSort={setSort}
                />
              }
            />
          </Routes>

          <section className="my-6 text-tertiary">
            *the price has been cutted by discount appears
          </section>
          {Number(props.userInfo.role) > 1 && (
            <div className="mt-auto flex w-full">
              <button
                onClick={() => navigate("/products/new")}
                className="btn btn-block btn-primary text-white font-bold normal-case"
              >
                Add new product
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
