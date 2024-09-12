import classes from "./NavBar.module.css";
import Links from "./Links";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayActions } from "../../Store/Display";
function NavBar() {
  const [isMobileView, setMobileView] = useState(window.innerWidth < 1000);
  const displayLink = useSelector(store=>store.display.displayLink);
  const dispatch=useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const displayLinkHandler = () => {
    dispatch(displayActions.displayLinkHandler())
  };
  const display = !isMobileView || displayLink;
  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
      <div className={classes.logoContainer}>
        <img src="/logo.svg" className={classes.img} />
        <h>
          Exploree<span className={classes.color}> Consultancy</span>
        </h>
      </div>
      {isMobileView && (
        <div>
          <img
            src={!displayLink ? "/menuIcon.svg" : "/cancelIcon.svg"}
            className={classes.img}
            onClick={displayLinkHandler}
          />
        </div>
      )}

      </div>
      {display && <Links />}
    </div>
  );
}
export default NavBar;
