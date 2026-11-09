import express from "express";

// Help connect to database
import db from "../db/connection.js";

// converts id from string to ObjectId for the _id
import { ObjectId } from "mongodb";

const router = express.Router();

// get list of all records
router.get("/", async (req, res) => {
    let collection = await db.collection("logins");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = db.collection("logins");

    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({error: "Invalid login ID"});
    }

    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if(!result) res.status(404).send("Not found");
    else res.status(200).send(result);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    let collection = db.collection("logins");
    let result = await collection.insertOne(newDocument);

    res.status(201).json({
      _id: result.insertedId,
      ...newDocument,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding login");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid login ID" });
    }

    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        username: req.body.username,
        password: req.body.password,
      },
    };

    let collection = await db.collection("logins");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating login");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid login ID" });
    }

    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("logins");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting login");
  }
});

export default router;
