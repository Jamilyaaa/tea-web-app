const express = require("express");

const router = express.Router();

const { Tea } = require("../db/models");

router.get("/:id", async (req, res) => {
  const tea=await Tea.findByPk(req.params.id);
  res.render("tea", {tea: tea.id});
});


module.exports=router;

