import { NavLink } from "react-router-dom";
import classes from "./Links.module.css";
import { useDispatch } from "react-redux";
import { displayActions } from "../../Store/Display";
function Links() {
    const dispatch=useDispatch();
    const displayLinkHandler=()=>{
        dispatch(displayActions.displayLinkHandler())
    }
  return (
    <div className={classes.container}>
      <div>
        {" "}
        <NavLink activeClassName={classes.active} to="/" exact onClick={displayLinkHandler}>
          Dashboard
        </NavLink>
        <NavLink activeClassName={classes.active} to="/disable_date" onClick={displayLinkHandler}>
          Disable Date
        </NavLink>
      </div>{" "}
    </div>
  );
}
export default Links;
