const express = require("express")
const router = new express.Router()

const font = require('oled-font-5x7');
const i2c = require('i2c-bus');
const i2cBus = i2c.openSync(1);
const oled = require('oled-i2c-bus');
const displayOpts = {
  width: 128,
  height: 32,
  address: 0x3C
};
const display = new oled(i2cBus, displayOpts);

router.post("/display", async (req, res) => {
    console.log(req.body)
    try {
	display.clearDisplay();
	display.setCursor(1, 1);
	display.writeString(font, 1, req.body.msg, 1, true);

        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router
