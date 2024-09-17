const cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();
const fsp = require("fs").promises;
require("dotenv").config();

const ORDERING_REGEX_DEFAULT =
  ".*\\d\\d_f\\d{0,}+$;.*\\d\\d_b\\d{0,}+$;.*\\d\\d_a\\d{0,}+$;.*_e1_f\\d{0,}+$;.*_e1_b\\d{0,}+$;.*_e1_a\\d{0,}+$;.*_e2_f\\d{0,}+$;.*_e2_b\\d{0,}+$;.*_e2_a\\d{0,}+$;.*\\d\\d_fb\\d{0,}+$;.*\\_[1-9]_fb\\d{0,}+$";
const videoSuffixes = "";
// searchProductImages
// sortAndFilterImages
// sortAndFilterImagesToAssets
// getImageName
// valid
// getImagePathsString
// getVideoSuffixes

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {
  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId);
    // console.log(result.derived);
    //return result.colors;
    return result.derived;
  } catch (error) {
    console.error(error);
  }
};

const getImageSetInfo = async (imagePath) => {
  // Return colors in the response
  const options = {
    colors: true,
  };
  let result = await fetch(imagePath)
    .then((result) => result)
    .then((res) => res.text());
  return result;
};

const createImageTag = (publicId, ...colors) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};

router.post("/", (req, res, next) => {
  // Return "https" URLs by setting secure: true
  cloudinary.config({
    secure: true,
  });

  let imageData = [];
  (async () => {
    // Set the image to upload
    const imagePath =
      "https://express-prod1.adobecqms.net/content/expimageset.0094_07858364_0011.json";
    // Cached version of the image asset
    // const imagePath = "https://images.express.com/is/image/expressfashion/0086_06410562_0001?req=imageset&cache=on"
    const derivedSet = await getImageSetInfo(imagePath);

    const allAssets = derivedSet.split(",");
    const promises = [];

    for (var i in allAssets) {
      return promises.push(getAssetInfo(allAssets[i].split("/")[1]));
    }
    return Promise.all(promises).then((data) => {
        if (data) {
          imageData = data;
          res.json(imageData)
          fsp.writeFile("imageset.json", JSON.stringify(imageData));
          return imageData;
        } else {
          reject("failed to resolve the promise");
        }
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  })();
});
router.post("/:publicId", (req, res, next) => {
  // Return "https" URLs by setting secure: true
  cloudinary.config({
    secure: true,
  });
  // To get the query params from URL
  const { publicId } = req.params;

  (async () => {
    const ImageDetails = await getAssetInfo(publicId);
    res.json(ImageDetails);
  })();
});
module.exports = router;
