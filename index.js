require("dotenv").config();

const express = require("express");

const cloudinary = require("cloudinary");

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.get("/:id", async (req, res) => {
  const options = { secure: true ,related: true};

  const publicId = req.params.id;
  const callback = async (result) => {
    const defaultOrder = [
      "_v",
      "_c",
      "_f",
      "_e1_v",
      "_e1_f",
      "_e2_v",
      "_e2_f",
      "_a",
      "_d",
      "_fb",
    ];

    const sortedData = result.related_assets.reduce((acc, item) => {
      const fourthElement = item.public_id.split("_")[3];
      const firstChar = "_" + fourthElement.charAt(0);

      const patternIndex = defaultOrder.findIndex(
        (pattern) => firstChar === pattern.charAt(1)
      );

      if (!acc[patternIndex]) {
        acc[patternIndex] = [];
      }

      acc[patternIndex].push(item);

      return acc;
    }, []);
    const sortResult = async () => {
      const regExpression = /.*\d{2}_c\d*;.*\d_\d*_fb\d*;.*\d{2}_f\d*;.*\d{2}_b\d*;.*_e1_f\d*;.*_e1_b\d*;.*_e1_a\d*;.*_e2_f\d*;.*_e2_b\d*;.*_e2_a\d*;.*\d{2}_a\d*;.*\d{2}_d\d*/
      
      function findIndexByTag(_orderArr, _searchStr) {
        return _orderArr.findIndex((e) => {
          return `_${_searchStr}`.match(regExpression);
        });
      }

      const nameTagDatas = await sortedData[-1].map((item) => {
        return item.public_id;
      });

      if (nameTagDatas) {
        return nameTagDatas.sort((a, b) => {
          if(a && b){
            return findIndexByTag(defaultOrder, a.split("_")[3].charAt(0)) -
            findIndexByTag(defaultOrder, b.split("_")[3].charAt(0));
          }
        });
      }
    };
    
    const resultSet = await sortResult();
    const finResult = await resultSet.map((item) => {
      return "expressfashion/" + item;
    });

    res.setHeader("content-type", "text/plain");
    res.send(finResult.toString());
    res.end();
  };

  cloudinary.v2.api
    .resource(publicId, options)
    .then(callback);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
