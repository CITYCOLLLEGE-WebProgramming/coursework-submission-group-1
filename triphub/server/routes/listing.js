const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

router.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in first." });
    }

    const {
      streetAddress,
      city,
      country,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator: req.session.userId, 
      streetAddress,
      city,
      country,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      price,
      listingPhotoPaths,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({ message: "Failed to create listing", error: err.message });
    console.log(err);
  }
});


router.get("/listings/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    console.log('Fetched listing:', listing);
    if (!listing) {
      return res.status(404).json({ message: "Listing cannot be found!" });
    }
    res.status(202).json(listing);
  } catch (err) {
    console.error('Error fetching listing:', err);
    res.status(404).json({ message: "Listing cannot be found!", error: err.message });
  }
});


router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

});


module.exports = router
