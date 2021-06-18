const options = {
  info: {
    title: "AEViso API",
    description: "REST API of the AEViso project by Wild Code School",
    version: "1.0.0",
  },
  baseDir: __dirname,
  filesPattern: ["./api/**/*.js"],
  exposeSwaggerUI: true,
  swaggerUIPath: "/api-docs",
};

module.exports = options;
