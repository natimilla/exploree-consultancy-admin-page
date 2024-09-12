import { useDispatch } from "react-redux";
import classes from "./Overlay.module.css";
import { displayActions } from "../../Store/Display";
const Error = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>Oops Something went wrong.</div>
      <div>
        <button
          className={classes.button}
          onClick={dispatch(displayActions.errorHandler())}
        >
          Ok
        </button>
      </div>
    </div>
  );
};
export default Error;
