const request = require("request");

const getWhether = (latitude, longitude, callback) => {
  const whether_Url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=3d260231c6bb7dd3e49bc5e3e3ffbe41";
  const w_response = request(
    { url: whether_Url, json: true },
    (error, { body } = {}) => {
      if (error) {
        callback("Unable to get forecast", undefined);
      } else if (body.error) {
        callback("No Data found", undefined);
      } else {
        callback(undefined, body);
      }
    }
  );
};

module.exports = getWhether;
