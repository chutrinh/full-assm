const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "datas",
  "mediaTypeList.json"
);

module.exports = class MediaType {
  static getMediaType = (mediaType, cb) => {
    const mediaTypes = fs.readFileSync(p, "utf8");
    if (mediaTypes) {
      const jsonMediaTypes = JSON.parse(mediaTypes);
      const media = jsonMediaTypes.find((item) => item === mediaType);
      if (media) {
        cb(media);
      } else {
        cb([]);
      }
    } else {
      cb([]);
    }
  };
};
