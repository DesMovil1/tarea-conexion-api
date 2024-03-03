import React, { createContext, useState } from 'react';

export const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);

  const agregarHistorial = (busqueda) => {
    setHistorial(prevHistorial => [...prevHistorial, busqueda]);
  };

  return (
    <BusquedaContext.Provider value={{ historial, agregarHistorial }}>
      {children}
    </BusquedaContext.Provider>
  );
};
