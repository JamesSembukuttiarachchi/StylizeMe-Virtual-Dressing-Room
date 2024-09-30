import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";

const CheckSize = () => {
  return (
    <div className="">
      <div>main page</div>
    </div>
  );
};

export default CheckSize;
