import Authority from "../models/Authority.js";

// @desc   Get nearby GHMC authorities within a radius (in km)
// @route  GET /api/authorities/nearby?lat=17.385&lng=78.486&radius=5
// @access Public or User Authenticated
export const getNearbyAuthorities = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng)
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });

    const radiusInMeters = (radius || 5) * 1000; // default 5 km

    const authorities = await Authority.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: radiusInMeters,
        },
      },
    }).select("-password");

    res.status(200).json(authorities);
  } catch (error) {
    console.error("Nearby lookup failed:", error);
    res
      .status(500)
      .json({ message: "Server error finding nearby authorities" });
  }
};
