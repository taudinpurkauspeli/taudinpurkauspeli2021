// use these for now, later on add info on how to change yourself.


module.exports = {
    HOST: "localhost",
    USER: "taudinpurkaus",
    PASSWORD: "kokeilu",
    DB: "taudinpurkaus",
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };