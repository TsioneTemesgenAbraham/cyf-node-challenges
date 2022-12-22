const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Create a message

app.post("/messages", function (request, response) {
  let nextId = 0 + messages.reduce((n, a) => (n < a.id ? a.id : n), 0);

  const newMsg = {
    id: ++nextId,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newMsg.from || !newMsg.text) {
    return response.status(400).json({ msg: "Please include name and msg " });
  }

  messages.push(newMsg);
  response.json(messages);
});

// Display all messages

app.get("/messages", function (request, response) {
  response.json(messages);
});

// Display one message

app.get("/messages/:id", function (request, response) {
  const foundMsg = messages.some(
    (msg) => msg.id === parseInt(request.params.id)
  );

  if (foundMsg) {
    response.json(
      messages.filter((msg) => msg.id === parseInt(request.params.id))
    );
  } else {
    response.status(400).json({ msg: "Message not found!" });
  }
});

// Delete message with the id provided

app.delete("/messages/:id", function (request, response) {
  const foundMsg = messages.some(
    (msg) => msg.id === parseInt(request.params.id)
  );

  if (foundMsg) {
    response.json({
      msg: "Message deleted",
      messages: messages.filter(
        (msg) => msg.id !== parseInt(request.params.id)
      ),
    });
  } else {
    response.status(400).json({ msg: "Message not found!" });
  }
});

app.listen(process.env.PORT || 3002);
