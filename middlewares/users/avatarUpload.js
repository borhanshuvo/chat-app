const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
    "Only .jpg, jpeg and .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.messege,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
