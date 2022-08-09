import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className='loading'>
      <i className='las la-sync-alt'></i>
      <div>Loding...</div>
    </div>
  );
};

export default Loading;
