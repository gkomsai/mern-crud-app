import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import AddMusicRecords from "../pages/AddMusicRecords";
import EditMusicRecord from "../pages/EditMusicRecord";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Allroutes = () => {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/albums/:id/edit"
          element={
            <RequireAuth>
              <EditMusicRecord />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/albums/create"
          element={
            <RequireAuth>
              <AddMusicRecords />{" "}
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Allroutes;
