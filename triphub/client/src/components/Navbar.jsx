import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleReportAProblem = () => {
    if (user) {
      navigate("/report");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <a href="/" className="navbar_logo">
        TRIPHUB
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            style={{ color: 'var(--pinkred)' }}
            onClick={() => {navigate(`/listings/${search}`)}}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        <a href="/report" onClick={handleReportAProblem} className="report_problem">
          Report problem
        </a>

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu style={{ color: 'var(--darkgrey)' }} />
          {!user ? (
            <Person style={{ color: 'var(--darkgrey)' }} />
          ) : (
            <img
              src={`http://localhost:3000/${user.profileImagePath.replace("public/", "")}`}
              alt="profile photo"
              className="profile_photo"
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
