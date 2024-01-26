const Tag = require("../models/Tags");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Tag created successfully",
      tagDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
  }
};

exports.showAllTags = async (_, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All tags returned successfully",
      allTags,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
  }
};
