export const notFoundErrorMiddleware = () => {
  if (err.status === 404) {
    res.status.send(err.message);
  } else {
    next(err);
  }
};

export const badRequestMiddleware = (err, req, res, next) => {
  if (err.status === 400) {
    res.status.send(err.message);
  } else {
    next(err);
  }
};

export const catchErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Generic Server Error");
};
