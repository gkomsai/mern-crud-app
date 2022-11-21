const { Router } = require("express");
const express = require("express");
const { getAllAlbums, getOneAlbum, addAlbum,  deleteAlbum, updateAlbum } = require("../controller/albumController");
const { checkUserAuth } = require("../middleware/authMiddleware");


const albumRouter = Router();

albumRouter.get("/", getAllAlbums);

albumRouter.use(checkUserAuth);


albumRouter.get("/:id", getOneAlbum);
albumRouter.post("/create",addAlbum);
albumRouter.patch("/:id/edit",updateAlbum );
albumRouter.delete("/:id", deleteAlbum);




module.exports = { albumRouter };
