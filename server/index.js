const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "5714815f497dbf5e7202e1477ce6aa8bd93e590bba4eaff57f5c0d13b12d94b9";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;

  // TODO: prove that a name is in the list

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
