import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import './AuthorProfile.css'; 

function AuthorProfile() {
  let { currentUser } = useSelector(state => state.userAuthorLoginReducer);

  // This function determines the class for the NavLink based on its active state
  const getNavLinkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  return (
    <div className="author-profile p-3">
      <ul className="nav justify-content-around fs-3" style={{'backgroundColor': '#e3f2fd'}}>
        <li className="nav-item">
          <NavLink
            className={getNavLinkClass} // Use the function here
            to={`articles-by-author/${currentUser.username}`}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={getNavLinkClass} // And here
            to="new-article"
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
