import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
