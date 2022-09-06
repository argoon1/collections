const allowedOrigins = [
  "https://main--tranquil-tapioca-38ff35.netlify.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, { origin: true });
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export { corsOptions, allowedOrigins };
