import React, { useEffect, useState } from "react";
import "./notification.scss";

interface notificationModel {
  message?: string;
}

const Notification = ({ message }: notificationModel) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message && message !== "") {
      setText(message);
      setIsOpen(true);
      handleNotification();
    }
  }, [message]);

  const handleNotification = () => {
    setTimeout(() => setIsOpen(false), 2000);
  };

  return (
    <div id='notification-modal' className={isOpen ? " open" : ""}>
      <div>
        <div>
          <span>{text}</span>
          <i
            className='las la-times-circle'
            onClick={() => setIsOpen(false)}></i>
        </div>
        <span id='loader'></span>
      </div>
    </div>
  );
};

export default Notification;
