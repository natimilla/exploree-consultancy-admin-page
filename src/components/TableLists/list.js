import { useEffect, useState } from "react";
import classes from './list.module.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,remove,ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { displayActions } from "../../Store/Display";

function List() {
  const firebaseConfig = {
    apiKey: "AIzaSyBtExpsMF8xPuLAdS-5dhsm1nvswv6ABfs",
    authDomain: "exploree-consultancy.firebaseapp.com",
    databaseURL: "https://exploree-consultancy-default-rtdb.firebaseio.com",
    projectId: "exploree-consultancy",
    storageBucket: "exploree-consultancy.appspot.com",
    messagingSenderId: "232503177813",
    appId: "1:232503177813:web:98c96770c0104fed8a5adc",
    measurementId: "G-S3YRLJ0NJ6"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database=getDatabase(app)
  const [clientArray, setClientArray] = useState([]);
  const [isEmpty,setISEMpty]=useState(false);
  
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      dispatch(displayActions.loadingHandler())
      try{
        const response = await fetch(
          "https://exploree-consultancy-default-rtdb.firebaseio.com/clientInformation.json"
        );
        const data = await response.json();
        if(data===null){
          setISEMpty(true);
          dispatch(displayActions.loadingHandler())
          return;
        }
        if(data.length===0){
          setISEMpty(true)
          dispatch(displayActions.loadingHandler())
          return;
        }
        setISEMpty(false);
        const ClientInformation = [];
        for (const key in data) {
          ClientInformation.push({
            id: key,
            name: data[key][0].name,
            appointment_date: new Date( data[key][0].appointment_date),
            phone: data[key][0].phonenumber,
            email: data[key][0].email,
          });
        }
        setClientArray(ClientInformation); 
        dispatch(displayActions.loadingHandler()) 
      }
      catch(error){
        dispatch(displayActions.loadingHandler())
        dispatch(displayActions.errorHandler())
      }    
    };
    fetchData();
  }, []);
 
  const removeHandler=async(id)=>{
    alert(id)
    dispatch(displayActions.loadingHandler());
    try{
      if(clientArray.length===1){
        setISEMpty(true);
      }
      const itemRef = ref(database, `clientInformation/${id}`);
      await remove(itemRef);
      setClientArray(items=>items.filter(item=>item.id!==id));
      dispatch(displayActions.loadingHandler())
    }
    catch(error){
      dispatch(displayActions.loadingHandler())
      dispatch(displayActions.errorHandler())
    }
    }
  return (
    <div>
      {isEmpty && <diV>No results Found</diV>}
      {!isEmpty && <table className={classes.table}>
        <tr className={classes.row}> 
          <th>Name</th>
          <th>Phone number</th>
          <th>Email Account</th>
          <th>Appointment date</th>
          <th></th>
        </tr>
        {clientArray.map((item) => {
          return (
            <tr key={item.id}  className={classes.row}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.appointment_date.toLocaleDateString()}</td>
              <td><img src='/delete.svg' onClick={()=>{removeHandler(item.id)}}/></td>
            </tr>
          );
        })}
      </table>}
      
    </div>
  );
}

export default List;
