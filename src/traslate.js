const translate = require('google-translate-api');
const i18n = require("i18n");

const traslateText = (data) => {
  let resultTraslate = [];

  i18n.configure({
    locales:['en','es'],
    defaultLocale: 'es',
    register: global,
    directory: __dirname + '/locales'
  });

  data.map(obj => {
    let newObj = {};

    for (let key in obj){
      if(obj.hasOwnProperty(key))
      newObj[i18n.__(key)] = obj[key];
    }

    resultTraslate.push(newObj);

  })

  return resultTraslate

}

module.exports = traslateText;