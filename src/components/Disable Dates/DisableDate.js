import classes from "./DisableDate.module.css";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { displayActions } from "../../Store/Display";

function DisableDate() {
  const dispatch = useDispatch();
  const [loadedData, setloadedData] = useState([]);
  const [disabledDate, setDisabledDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const disableDateHandler = (date) => {
    if (date) {
      setloadedData((prevData) => [...prevData, { disable_date: date }]);
      setDisabledDate(date);
    }
  };
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch(
          "https://exploree-consultancy-default-rtdb.firebaseio.com/disableDates.json"
        );
        const data = await response.json();
        const DUMMY_FILE = [];
        if(data.length===0){
          return
        }
        if(data===null){
          return
        }
        for (const key in data) {
          for (let i = 0; i < data[key].length; i++) {
            DUMMY_FILE.push({
              disabled_date: new Date(data[key][i].disable_date),
            });
          }
        }
        setDisabledDates(DUMMY_FILE);
      } catch (error) {
        dispatch(displayActions.errorHandler());
      }
    };
    fetchDate();
  }, []);

  const submitHanlder = async () => {
    if (loadedData.length === 0) {
      return;
    }
    try {
      dispatch(displayActions.loadingHandler());
      await fetch(
        "https://exploree-consultancy-default-rtdb.firebaseio.com/disableDates.json",
        {
          method: "POST",
          body: JSON.stringify(loadedData),
        }
      );
      setloadedData([]);
      setDisabledDate(null);
      dispatch(displayActions.loadingHandler());
    } catch (error) {
      dispatch(displayActions.loadingHandler());
      dispatch(displayActions.errorHandler());
    }
  
  };
  const today = new Date();
  const isDateDisabled = (date) => {
    return disabledDates.some(
      (disabledDate) =>
        date.toDateString() ===
        new Date(disabledDate.disabled_date).toDateString()
    );
  };
  const removeHandler = (date) => {
    setloadedData((prevData) => 
      prevData.filter((item) => item.disable_date.toISOString() !== date.toISOString())
  );
  };
  return (
    <div className={classes.container}>
      <div className={classes.heading}>SELECT DATE TO DISABLE</div>
      <div>
        <DatePicker
          minDate={today}
          onChange={disableDateHandler}
          placeholderText="Select date"
          selected={disabledDate}
          filterDate={(date) => !isDateDisabled(date)}
          className={classes.input}
        />
      </div>
      <button onClick={submitHanlder} className={classes.button}>
        SUBMIT
      </button>
      {loadedData.length > 0 &&
        loadedData.map((item) => {
          return (
            <div className={classes.lists} key={item.disable_date}>
              <h1>
                {" "}
                {item.disable_date.toLocaleString("default", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </h1>
              <img
                src="/delete.svg"
                className={classes.deleteIcon}
                onClick={() => {
                  removeHandler(new Date(item.disable_date));
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
export default DisableDate;
