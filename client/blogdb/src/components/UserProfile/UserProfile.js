
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <>

    <NavLink to='articles' className='fs-3 text-primary nav-link  p-2 text-center mt-2' style={{'backgroundColor': '#e3f2fd'}}>Articles</NavLink>
    <Outlet />
    </>
  );
}

export default UserProfile;
