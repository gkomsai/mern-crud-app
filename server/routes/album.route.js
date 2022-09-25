const { Router } = require("express");
const express = require("express");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { AlbumModel } = require("../models/AlbumModel");


const albumRouter = Router();

albumRouter.get("/", async (req, res) => {
  try {
    const result = await AlbumModel.find();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});
albumRouter.use(checkUserAuth);
albumRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const newAlbum = new AlbumModel(payload);
    await newAlbum.save(); 
    return res.status(201).send(newAlbum);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});


/* ----------------------For getting a single album obj by id---------------------------- */
albumRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
   
    const result = await AlbumModel.findOne({ _id: id }); 
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});

albumRouter.patch("/:id/edit", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(id, req.body);
    const updatedTodo = await AlbumModel.findByIdAndUpdate(_id,req.body,{new:true});  
    console.log(updatedTodo);
    return res.status(201).send(updatedTodo);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
});

albumRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await AlbumModel.findByIdAndDelete({ _id: id }); 
    res.send("successfully deleted in the database");
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Failed" });
}
});

module.exports = { albumRouter };
