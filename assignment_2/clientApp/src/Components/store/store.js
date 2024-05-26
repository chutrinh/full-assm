import React, { createContext, useEffect, useState } from "react";

export const StroreContext = createContext({});

function AppContext({ children }) {
  const [rerenderStore, setRenderStore] = useState(false);
  const [hotels, setHotels] = useState(null);

  const [dataSearch, setDataSearch] = useState(null);

  const ha_noi = { name: "Ha Noi", number: 0, image: "./images/Ha Noi.jpg" };
  const da_nang = { name: "Da Nang", number: 0, image: "./images/Da Nang.jpg" };
  const hcm = { name: "Ho Chi Minh", number: 0, image: "./images/HCM.jpg" };

  let rating;
  if (hotels) {
    rating = hotels.sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  if (hotels) {
    hotels.filter((hotel) => {
      if (hotel.city.toLowerCase() === "Ha Noi".toLowerCase()) {
        ha_noi.number += 1;
      }
      if (hotel.city.toLowerCase() === "Da Nang".toLowerCase()) {
        da_nang.number += 1;
      }
      if (hotel.city.toLowerCase() === "Ho Chi Minh".toLowerCase()) {
        hcm.number += 1;
      }
    });
  }

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((hotels) => {
        setHotels(hotels);
      });
  }, [rerenderStore]);

  return (
    <>
      <StroreContext.Provider
        value={{
          ha_noi,
          hcm,
          da_nang,
          rating,
          rerenderStore,
          setRenderStore,
          dataSearch,
          setDataSearch,
        }}
      >
        {children}
      </StroreContext.Provider>
    </>
  );
}
export default AppContext;
