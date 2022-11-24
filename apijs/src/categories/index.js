const express = require("express");
const { prisma } = require("../prisma");
const router = express.Router();
router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    if (categories.length === 0) {
      return res.sendStatus(404);
    }
    return categories.map(whiteLabelCategory);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
const whiteLabelCategory = (category) => {
  return {
    id: category.id,
    title: category.title,
    description: category.description,
    parent: category.parent,
    sort: category.sort,
    topics: category.topics,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

module.exports = router;
