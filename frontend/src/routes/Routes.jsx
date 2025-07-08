import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Home,
  Register,
  Login,
  KanbanBoard,
  ActionLog,
  Logout,
} from "../pages";
import Layout from "../layout";

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/kanbanboard" element={<KanbanBoard />} />
      <Route path="/actionlog" element={<ActionLog />} />
    </Route>
  )
);

export default AppRoutes;
