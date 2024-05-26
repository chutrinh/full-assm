import React, { useEffect } from "react";
import FormAuth from "../components/formAuth";

function Auth({ setEditProd }) {
  useEffect(() => {
    setEditProd(null);
  });
  return (
    <>
      <FormAuth />
    </>
  );
}
export default Auth;
