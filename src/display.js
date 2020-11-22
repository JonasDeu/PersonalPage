var i2c = require('i2c-bus'),
  i2cBus = i2c.openSync(1),
  oled = require('oled-i2c-bus');

var opts = {
  width: 128,
  height: 32,
  address: 0x3C
};

var oled = new oled(i2cBus, opts);

oled.clearDisplay();

var font = require('oled-font-5x7');

oled.setCursor(1, 1);
oled.writeString(font, 1, 'Waren die Eier plötzlich eckig, ging’s den Hühnern ganz schön dreckig.', 1, true);
