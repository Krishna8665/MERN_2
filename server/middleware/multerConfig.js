const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This filetype is not supported"));
      return;
    }
    cb(null, "./uploads"); //cb(error,success) // cb(eutra matra argument)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.filename + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

module.exports = upload;
