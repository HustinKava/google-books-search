import React from "react";
// Importing toast and it's css
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

// Passing the saved state located in App.js (this is how we get the value of the book that has been saved)
const Notification = (props) => {

    const notify = () => {
        if(props.saved) {
            toast.info(`Book: ${props.saved} has been saved!`)
        }
    };

    return (
          <div>{notify()}</div>  
)};

export default Notification;