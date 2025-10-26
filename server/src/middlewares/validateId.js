function validateId(req, res, next) {
  const { id } = req.params;
  if (Number.isNaN(+id)) return res.status(400).json({ message: 'Put number id' });
  // res.locals.eagles = 11; 
  // res.locals.user = { userName: 'Eagle', phase: 2 };
  return next();
}

module.exports = validateId;
