import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Notification = (props) => {

    const notify = () => {
        if(props.saved) {
            toast(`Book: ${props.saved} has been saved!`)
        }
    };

    return (
          <div>{notify()}</div>  
)}

export default Notification;