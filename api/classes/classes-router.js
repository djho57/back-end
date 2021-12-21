const router = require("express").Router();
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./classes-middleware");
const { restricted } = require("../auth/auth-middleware");
const Classes = require("./classes-model");

router.get("/", restricted, async (req, res, next) => {
  try {
    const classes = await Classes.getAll();
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, checkAccountId, async (req, res, next) => {
  try {
    res.json(req.classes);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  restricted,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newClasses = await Classes.create({
        class_name: req.body.class_name.trim(),
        class_type: req.body.class_type,
        start_time: req.body.start_time,
        class_intensity_level: req.body.class_intensity_level,
        class_location: req.body.class_location,
        // number_registered: req.body.number_registered,
        max_attendees: req.body.max_attendees,
      });
      res.status(201).json(newClasses);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  restricted,
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updated = await Classes.updateById(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", restricted, checkAccountId, async (req, res, next) => {
  try {
    await Classes.deleteById(req.params.id);
    res.json(req.classes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
