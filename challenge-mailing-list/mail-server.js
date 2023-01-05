const express = require("express");
const app = express();
const port = 7000;
const lists = require("./lists.json");

app.get("/", (req, res) => {
  res.send("You did it");
  console.log("MIMI");
});

app.get("/lists", (req, res) => {
  const names = lists.filter((n) => n.name.name);
  console.log(names);
  if (names) {
    res.status(200).send(lists.filter((n) => n.name));
  } else {
    res.status(200).send("No names");
  }
});

app.get("/lists/:name", (req, res) => {
  const valueN = req.params.name;
  const reName = lists.some((n) => n.name === valueN);

  if (reName) {
    res.status(200);
    res.send(lists.filter((n) => n.name === valueN));
  } else {
    res.status(404);
    res.json({ error: "hi" });
  }
});

app.delete("/lists/:name", (req, res) => {
  const valueN = req.params.name;
  const reName = lists.some((n) => n.name === valueN);

  if (reName) {
    res.status(200);
    res.json({
      message: "Member deleted",
      members: lists.filter((n) => n.name !== valueN),
    });
  } else {
    res.status(404);
    res.json({ error: "No member with this name" });
  }
});

// app.get("/lists", (req, res) => {
//   const listsArray = Array.from(lists.keys()); // Why is this like this? Try it out in your console.
//   res.send(listsArray);
// });

const listening = app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});
