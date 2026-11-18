import re

raw = """
CSS selector 1: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1)
CSS 1: {
  font-size: 20px;
}
CSS selector 2: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > span:nth-of-type(1)
CSS 2: {
  font-size: 30px;
  font-family: Reem Kufi;
}
CSS selector 3: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > h2:nth-of-type(1)
CSS 3: {
  font-family: Noto Naskh Arabic;
  font-size: 139px;
  margin-top: -56px;
}
CSS selector 4: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 4: {

}
CSS selector 5: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1)
CSS 5: {
  font-size: 15px;
}
CSS selector 6: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > h3:nth-of-type(1)
CSS 6: {
  font-size: 55px;
  font-family: Arial;
}
CSS selector 7: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > h4:nth-of-type(1)
CSS 7: {
  font-size: 28px;
}
CSS selector 8: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > h4:nth-of-type(1)
CSS 8: {
  font-size: 28px;
}
CSS selector 9: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > span:nth-of-type(1)
CSS 9: {
  font-size: 15px;
}
CSS selector 10: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > span:nth-of-type(2)
CSS 10: {
  font-size: 15px;
}
CSS selector 11: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > span:nth-of-type(2)
CSS 11: {
  font-size: 15px;
}
CSS selector 12: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > span:nth-of-type(1)
CSS 12: {
  font-size: 15px;
}
CSS selector 13: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > span:nth-of-type(1)
CSS 13: {
  font-size: 18px;
}
CSS selector 14: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(4) > h4:nth-of-type(1)
CSS 14: {
  font-family: Arial;
}
CSS selector 15: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(4) > p:nth-of-type(1)
CSS 15: {
  font-family: Noto Nastaliq Urdu;
  line-height: 40.5px;
}
CSS selector 16: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(5) > span:nth-of-type(1)
CSS 16: {
  font-size: 20px;
  font-family: Arial;
}
CSS selector 17: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(5) > span:nth-of-type(2)
CSS 17: {
  font-size: 20px;
  font-family: Arial;
}
CSS selector 18: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(5) > button:nth-of-type(1)
CSS 18: {
  font-family: Noto Nastaliq Urdu;
  font-size: 18px;
}
CSS selector 19: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(1)
CSS 19: {
  font-family: Arial;
}
CSS selector 20: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(1) > h3:nth-of-type(1)
CSS 20: {
  font-family: Arial;
  font-size: 50px;
}
CSS selector 21: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > h4:nth-of-type(1)
CSS 21: {
  font-family: Arial;
  font-size: 45px;
}
CSS selector 22: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > h4:nth-of-type(1)
CSS 22: {
  font-family: Arial;
  font-size: 45px;
}
CSS selector 23: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > p:nth-of-type(1)
CSS 23: {
  font-size: 23px;
}
CSS selector 24: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > p:nth-of-type(1)
CSS 24: {
  font-size: 23px;
}
CSS selector 25: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3)
CSS 25: {
  font-size: 22px;
}
CSS selector 26: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3)
CSS 26: {
  font-size: 22px;
}
CSS selector 27: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3)
CSS 27: {
  font-size: 22px;
}
CSS selector 28: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3)
CSS 28: {
  font-size: 22px;
}
CSS selector 29: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(3)
CSS 29: {
  font-size: 22px;
}
CSS selector 30: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(3)
CSS 30: {
  font-size: 22px;
}
CSS selector 31: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > button:nth-of-type(1)
CSS 31: {
  font-family: Noto Naskh Arabic;
  font-size: 30px;
}
CSS selector 32: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > button:nth-of-type(1)
CSS 32: {
  font-size: 30px;
  font-family: Noto Naskh Arabic;
}
CSS selector 33: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > h3:nth-of-type(1)
CSS 33: {
  font-family: Arial;
  font-size: 55px;
}
CSS selector 34: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > span:nth-of-type(1)
CSS 34: {
  font-size: 25px;
}
CSS selector 35: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > p:nth-of-type(1)
CSS 35: {
  font-family: Noto Nastaliq Urdu;
  font-size: 20px;
  font-weight: normal;
  line-height: 39.5px;
}
CSS selector 36: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > h4:nth-of-type(1)
CSS 36: {
  font-family: Arial;
  font-size: 29px;
}
CSS selector 37: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > h4:nth-of-type(1)
CSS 37: {
  font-family: Noto Nastaliq Urdu;
  font-size: 23px;
}
CSS selector 38: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > p:nth-of-type(1)
CSS 38: {
  font-size: 20px;
  font-family: Noto Naskh Arabic;
}
CSS selector 39: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 39: {
  font-size: 19px;
  font-family: Noto Nastaliq Urdu;
}
CSS selector 40: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > h4:nth-of-type(1)
CSS 40: {
  font-size: 23px;
}
CSS selector 41: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(1)
CSS 41: {
  font-family: Noto Naskh Arabic;
  font-size: 20px;
}
CSS selector 42: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(1)
CSS 42: {

}
CSS selector 43: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(1) > h4:nth-of-type(1)
CSS 43: {
  font-family: Noto Nastaliq Urdu;
  font-size: 23px;
}
CSS selector 44: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > p:nth-of-type(1)
CSS 44: {
  font-family: Noto Naskh Arabic;
  font-size: 20px;
}
CSS selector 45: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(4) > div:nth-of-type(1) > h4:nth-of-type(1)
CSS 45: {
  font-family: Noto Nastaliq Urdu;
  font-size: 23px;
}
CSS selector 46: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(4) > p:nth-of-type(1)
CSS 46: {
  font-size: 20px;
  font-family: Noto Naskh Arabic;
}
CSS selector 47: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 47: {
  font-family: Noto Nastaliq Urdu;
  font-size: 23px;
  line-height: 32.8571px;
}
CSS selector 48: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2)
CSS 48: {
  font-size: 20px;
  font-style: normal;
  font-family: Noto Naskh Arabic;
  margin-top: 0px;
  margin-left: 0px;
  padding-top: 4px;
}
CSS selector 49: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2)
CSS 49: {
  font-size: 20px;
  font-style: normal;
  font-family: Noto Naskh Arabic;
  padding-top: 4px;
}
CSS selector 50: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 50: {
  font-size: 23px;
  font-family: Noto Nastaliq Urdu;
}
CSS selector 51: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2)
CSS 51: {
  font-size: 20px;
  font-family: Noto Naskh Arabic;
  font-style: normal;
  font-weight: normal;
  padding-top: 4px;
}
CSS selector 52: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 52: {
  font-size: 23px;
  font-family: Noto Nastaliq Urdu;
}
CSS selector 53: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2)
CSS 53: {
  font-family: Noto Naskh Arabic;
  font-size: 20px;
  font-style: normal;
  padding-top: 4px;
}
CSS selector 54: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 54: {
  font-family: Noto Nastaliq Urdu;
  font-size: 23px;
}
CSS selector 55: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)
CSS 55: {
  font-size: 23px;
  font-weight: bold;
  font-family: Noto Naskh Arabic;
}
CSS selector 56: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2)
CSS 56: {
  font-size: 23px;
  font-family: Noto Naskh Arabic;
  font-weight: bold;
}
CSS selector 57: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2)
CSS 57: {
  font-size: 35px;
}
CSS selector 58: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1)
CSS 58: {

}
CSS selector 59: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2)
CSS 59: {
  font-size: 35px;
}
CSS selector 60: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2)
CSS 60: {
  font-size: 35px;
}
CSS selector 61: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2)
CSS 61: {
  font-size: 35px;
}
CSS selector 62: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2)
CSS 62: {
  font-size: 35px;
}
CSS selector 63: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(2)
CSS 63: {
  font-size: 35px;
}
CSS selector 64: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3)
CSS 64: {
  font-size: 23px;
  font-weight: bold;
  font-family: Noto Naskh Arabic;
}
CSS selector 65: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4)
CSS 65: {
  font-size: 23px;
  font-family: Noto Naskh Arabic;
  font-weight: bold;
}
CSS selector 66: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(5)
CSS 66: {
  font-size: 23px;
  font-family: Noto Naskh Arabic;
  font-weight: bold;
}
CSS selector 67: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(6)
CSS 67: {
  font-size: 23px;
  font-weight: bold;
  font-family: Noto Naskh Arabic;
}
CSS selector 68: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(7)
CSS 68: {
  font-size: 23px;
  font-family: Noto Naskh Arabic;
  font-weight: bold;
}
CSS selector 69: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(8)
CSS 69: {
  font-size: 23px;
  font-weight: bold;
  font-family: Noto Naskh Arabic;
}
CSS selector 70: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(9)
CSS 70: {
  font-family: Noto Naskh Arabic;
  font-weight: bold;
  font-size: 23px;
}
CSS selector 71: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1)
CSS 71: {
  font-size: 22px;
  font-family: Noto Nastaliq Urdu;
}
CSS selector 72: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(6) > div:nth-of-type(1) > div:nth-of-type(1) > h3:nth-of-type(1)
CSS 72: {
  font-size: 55px;
  font-family: Arial;
}
CSS selector 73: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(6) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)
CSS 73: {
  font-size: 20px;
  font-family: Noto Nastaliq Urdu;
}
CSS selector 74: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(6) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)
CSS 74: {
  font-size: 18px;
}
CSS selector 75: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(6) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(2)
CSS 75: {
  font-size: 20px;
  font-family: Noto Nastaliq Urdu;
  line-height: 38px;
}
CSS selector 76: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(7) > div:nth-of-type(2) > h3:nth-of-type(1)
CSS 76: {
  font-family: Arial;
  font-size: 45px;
  font-weight: bold;
}
CSS selector 77: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(7) > div:nth-of-type(2) > p:nth-of-type(1)
CSS 77: {
  font-family: Noto Nastaliq Urdu;
}
CSS selector 78: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(7) > div:nth-of-type(2) > p:nth-of-type(2)
CSS 78: {
  font-family: Noto Nastaliq Urdu;
  font-style: normal;
}
CSS selector 79: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(7) > div:nth-of-type(2) > button:nth-of-type(1)
CSS 79: {
  font-size: 23px;
  font-family: Noto Naskh Arabic;
}
CSS selector 80: div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(8) > div:nth-of-type(1) > h3:nth-of-type(1)
CSS 80: {
  font-family: Arial;
  font-size: 55px;
}
"""

blocks = []
lines = raw.split('\n')
current_selector = None
current_css = []
in_css = False

for line in lines:
    line = line.rstrip()
    if line.startswith('CSS selector'):
        current_selector = line.split(': ', 1)[1].strip()
    elif line.startswith('CSS '):
        in_css = True
        current_css = []
    elif in_css:
        if line.strip() == '}':
            in_css = False
            if current_selector and current_css:
                joined = "\n".join(current_css).strip()
                if joined:
                    # Add !important to all lines
                    important_lines = []
                    for c_line in current_css:
                        if c_line.strip() and not c_line.strip().endswith('}'):
                            important_lines.append(c_line.rstrip(';') + ' !important;')
                        else:
                            important_lines.append(c_line)
                    
                    blocks.append(f'html[lang="ur"] {current_selector} {{\n' + "\n".join(important_lines) + '\n}')
        else:
            current_css.append(line)

css_output = '\n/* --- Focus Mode: Specific styling for Urdu --- */\n' + "\n".join(blocks) + '\n'

with open('src/index.css', 'a') as f:
    f.write(css_output)

print("Appended rules to src/index.css")
