const express = require("express");

const router = express.Router();

const { Tea } = require("../db/models");

router.get("/:id", async (req, res) => {
  const tea=await Tea.findByPk(req.params.id);
  // const value = await Tea.findAll({ raw: true });
  res.render("tea", {tea: tea.tea_name,value:tea});
});


module.exports=router;

