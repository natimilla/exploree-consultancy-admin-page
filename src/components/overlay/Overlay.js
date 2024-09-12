import { useSelector } from 'react-redux';
import Loading from './Loading';
import Error from './Error';
import classes from './Overlay.module.css';
function Overlay(){
    const loading=useSelector(Store=>Store.display.loading)
    const error=useSelector(Store=>Store.display.error)
    return <div className={classes.container}>
        {loading && <Loading/>}
       {error && <Error/>}
    </div>
}
export default Overlay