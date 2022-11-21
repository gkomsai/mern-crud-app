const { AlbumModel } = require("../models/albumModel");

const getAllAlbums = async (req, res) => {
  try {
    console.log("query", req.query);
    let { _sort, _order, page, limit, ...rest } = req.query;
    page = +page || 1;
    limit = +limit || 6;
    const skip = (page - 1) * limit;
    let order;
    if (_order) {
      order = _order === "asc" ? 1 : -1;
    }

    if (req.query) {
      const totalAlbum = await AlbumModel.find(rest).count();
      const totalPages = Math.ceil(totalAlbum / limit);
      const result = await AlbumModel.find(rest)
        .skip(skip)
        .limit(limit)
        .sort({ year: order });
      return res.status(200).send({ result, totalPages });
    } else {
      const totalAlbum = await AlbumModel.find({}).count();
      const totalPages = Math.ceil(totalAlbum / limit);
      const result = await AlbumModel.find();
      console.log("else");
      if (result.length > 0) {
        return res.status(200).send({ result, totalPages });
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
};

const getOneAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AlbumModel.findById({ id });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const addAlbum = async (req, res) => {
  try {
    const newAlbum = new AlbumModel(req.body);
    await newAlbum.save();
    return res.status(201).send(newAlbum);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
   
    const foundAlbum = await AlbumModel.findById(id);
       if (foundAlbum.userId === userId) {
  
      const updatedAlbum = await AlbumModel.findByIdAndUpdate(
        { _id:id },
        req.body,
        { new: true }
      );
      if (updatedAlbum) {
        return res
          .status(201)
          .send({ status: "success", message: " updated successfully" });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to update this album",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
  
    const foundAlbum = await AlbumModel.findById(id);
    if (foundAlbum.userId === userId) {
      const deleteAlbum = await AlbumModel.findByIdAndDelete(id);

      if (deleteAlbum) {
        return res
          .status(200)
          .send({ status: "success", message: "Album successfully deleted" });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to delete this album",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

module.exports = {
  getAllAlbums,
  getOneAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
