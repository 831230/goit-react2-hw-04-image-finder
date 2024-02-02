import React from "react";

import { Audio } from "react-loader-spinner";

const Loader = ({ loader }) => {
  const loaderVisibility = loader ? (
    <Audio
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
/>
  ) : null;
  return <>{loaderVisibility}</>;
};

export default Loader;
