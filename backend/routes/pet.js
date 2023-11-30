const router = require("express").Router();
const { verify } = require("../middleware/Authentication");
const {
  addPet,
  getPets,
  updatePet,
  getPetById,
  getPetByUser,
  updatePetAdoptionRequest,
} = require("../db/PetQueries");
const { AppError } = require("../utils/errors");
const { genrateResponse } = require("../utils/functions");
const multer = require("../utils/multer");
const uuid = require("uuid");
const { uploadImage } = require("../utils/s3");
const fetchCloudFormationUrl = require("../utils/cloudformation");
const { sendEmail } = require("../utils/sns");
const { findUserByEmail } = require("../db/UserQueries");

router.use(verify);

router.get("/", async (req, res) => {
  const { query } = req;
  const pets = await getPets();

  if (query.search) {
    const searchString = query.search.toLowerCase();
    const data = pets.filter((pet) =>
      pet.search.some((d) => d.toLowerCase() === searchString)
    );
    return genrateResponse(res, 200, true, data);
  }

  return genrateResponse(
    res,
    200,
    true,
    pets.filter((pet) => !pet.adopted)
  );
});

router.get("/donations", async (req, res) => {
  const { user } = req;
  return genrateResponse(res, 200, true, await getPetByUser(user.email));
});

router.post("/donate", multer.single("file"), async (req, res) => {
  const { name, category, breed, about, contact } = req.body;
  const { file } = req;
  const { user } = req;

  console.log(name, category, breed, about, contact);

  if (!file || !name || !category || !breed || !about || !contact) {
    throw new AppError(
      200,
      "file ,name, category, breed, about, contact is required."
    );
  }
  const ImageId = await uuid.v4();
  const imageUploaded = await uploadImage(ImageId, file);

  await addPet({
    id: imageUploaded.Key,
    url: await fetchCloudFormationUrl(imageUploaded.Key),
    email: user.email,
    name,
    category,
    breed,
    about,
    contact,
    adopted: false,
  });
  return genrateResponse(res, 200, true, {
    id: ImageId,
  });
});

router.post("/reqAdoption", async (req, res) => {
  const { id } = req.body;
  const { user } = req;

  if (!id) {
    throw new AppError(200, "id is required.");
  }
  const pet = await getPetById(id);
  const petUser = await findUserByEmail(pet[0].email);
  await sendEmail(petUser[0].id, `${user.email} wants to adopt your pet.`);
  await updatePetAdoptionRequest(id, user.email);
  return genrateResponse(res, 200, true);
});

router.post("/approveAdoption", async (req, res) => {
  const { id } = req.body;
  const { user } = req;

  if (!id) {
    throw new AppError(200, "id is required.");
  }
  const pet = await getPetById(id);
  const adoptedUser = await findUserByEmail(pet[0].requestedBy);
  await sendEmail(
    adoptedUser[0].id,
    `${user.email} accepted your adoption request for pet ${pet.name}.`
  );
  await updatePet(id, true, pet[0].requestedBy);
  return genrateResponse(res, 200, true);
});

module.exports = router;
