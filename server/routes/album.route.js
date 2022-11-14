const { Router } = require("express");
const express = require("express");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { AlbumModel } = require("../models/albumModel.js");

const albumRouter = Router();

albumRouter.get("/", async (req, res) => {
  try {
    // console.log("query", req.query);
    let { _sort, _order, page, limit, ...rest } = req.query;
     page = +page || 1;
     limit = +limit || 6;
    const skip = (page - 1) * limit;
    let order;
    if (_order) {
    order = _order === "asc" ? 1 : -1;
      
    }
    const totalAlbum = await AlbumModel.find({}).count()
    const totalPages = Math.ceil(totalAlbum / limit);
    if (req.query) {
      // console.log("inside this")
      const result = await AlbumModel.find(rest).skip(skip)
      .limit(limit).sort({ year: order });
      return res.status(200).send({result,totalPages});
    }else {
      const result = await AlbumModel.find();
      console.log("else");
      if (result.length > 0) {
        return res.status(200).send({result,totalPages});
      } else {
        return res
          .status(400)
          .json({ message: "please create a album first", status: "error" });
      }
    }
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: "Something went wrong", status: "error" });
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
    return res.status(500).json({ message: err.message, status: "error" });
  }
});

/* ----------------------For getting a single album obj by id---------------------------- */
albumRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await AlbumModel.findOne({ _id: id });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
});

albumRouter.patch("/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(_id, req.body);
    const updatedAlbum = await AlbumModel.findOneAndUpdate(
      { _id: id, userId: req.body.userId },
      req.body,
      {
        new: true,
      }
    );
    // console.log(updatedTodo);
    if (updatedAlbum) {
      return res
        .status(201)
        .send({ status: "success", message: "successfully updated" });
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to update this album",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
});

albumRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const deleteAlbum = await AlbumModel.findOneAndDelete({ _id: id, userId });
    if (deleteAlbum) {
      return res
        .status(200)
        .send({ status: "success", message: "music successfully deleted" });
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to delete this album",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = { albumRouter };
