import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAxios } from "hooks";
import { clients } from "services";
import { Clients, Login } from "views";

export const Router = () => {
  const { data: clientsData } = useAxios(clients);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="clients">
          <Route index element={<Clients clientsData={clientsData} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
