const express = require("express");
const { z } = require("zod");
const { prisma } = require("../prisma");
const { nanoid } = require("nanoid");

const router = express.Router();

router.get("/topics", async (req, res) => {
  try {
    const topics = await prisma.topics.findMany();

    if (topics.length === 0) {
      return res.sendStatus(404);
    }

    const whitelabeledTopics = topics.map(whiteLabelTopic);

    return res.json(whitelabeledTopics);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

const CreateTopicBodySchema = z.object({
  title: z.string(),
  description: z.string(),
});

router.post("/topics", async (req, res) => {
  try {
    const parsedBody = CreateTopicBodySchema.safeParse(req.body);

    if (parsedBody.error) {
      return res
        .status(400)
        .statusMessage("Unable to create item. Data is incomplete");
    }

    const dataForTopicCreation = parsedBody.data;

    const topicCreated = await prisma.topics.create({
      data: {
        description: dataForTopicCreation.description,
        title: dataForTopicCreation.title,
        published: "",
        id: nanoid(),
      },
    });

    const whiteLabeledTopicCreated = whiteLabelTopic(topicCreated);

    return res.json(whiteLabeledTopicCreated);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

const whiteLabelTopic = (topicFromDb) => {
  return {
    id: topicFromDb.id,
    title: topicFromDb.title,
    description: topicFromDb.description,
    published: topicFromDb.published,
    createdAt: topicFromDb.createdAt,
    updatedAt: topicFromDb.updatedAt,
  };
};

module.exports = router;
