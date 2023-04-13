const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Countries, Activity } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries/:id", async (req, res) => {
  if (req.params.id === 1) {
    res.json("funca");
  } else {
    const actividad = await Countries.findByPk(req.params.id, {
      include: [
        {
          model: Activity,
          attributes: ["name", "dificult", "duration", "station", "countriess"],
        },
      ],
    });
    if (actividad == null || actividad.length > 3) {
      res.json([]);
    }
    res.json([actividad]);
  }
});

router.get("/countries", async (req, res) => {
  const countriesdb = await Countries.findAll({
    include: [
      {
        model: Activity,
        attributes: ["name", "dificult", "duration", "station", "countriess"],
      },
    ],
  });
  if (req.query.name || countriesdb.lenght > 1)
    try {
      const filter = countriesdb.filter((e) => e.name == req.query.name);
      const result = countriesdb.map(function (e) {
        const obj = {};
        obj.id = e.id;
        obj.name = e.name.toLowerCase();
        obj.continents = e.continents;
        obj.image = e.flags;
        obj.capital = e.capital;
        obj.subregion = e.subregion;
        obj.area = e.area;
        obj.population = e.population;
        obj.activities = e.activities;

        return obj;
      });
      res.json(filter);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  else
    try {
      if (countriesdb.length == 0) {
        const fet = await fetch("https://restcountries.com/v3/all").then((r) =>
          r.json()
        );
        const filtrado = fet.map(function (e) {
          let capitales = "";
          if (e.capital) {
            capitales = e.capital[0];
          } else {
            capitales = "No hay registros";
          }
          const obj = {};
          obj.id = e.cca3;
          obj.name = e.name.common.toLowerCase();
          obj.continents = e.continents[0];
          obj.image = e.flags[1];
          obj.capital = capitales;
          obj.subregion = e.subregion;
          obj.area = e.area;
          obj.population = e.population;

          Countries.create(obj);
          return obj;
        });
        res.send(filtrado);
      } else {
        const filtrado = countriesdb.map(function (e) {
          let capitales = "";
          if (e.capital) {
            capitales = e.capital[0];
          } else {
            capitales = "No hay registros";
          }
          const obj = {};
          obj.id = e.id;
          obj.name = e.name.toLowerCase();
          obj.continents = e.continents;
          obj.image = e.image;
          obj.capital = e.capital;
          obj.subregion = e.subregion;
          obj.area = e.area;
          obj.population = e.population;
          obj.activities = e.activities;
          return obj;
        });
        res.json(filtrado);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});

router.post("/activity", async (req, res) => {

  const datos = req.body;

  const actividad = await Activity.create(
    {
      name: datos.Activity,
      dificult: datos.Difficult,
      duration: datos.Time,
      station: datos.Season,
      countriess: datos.Countries,
    },
    {
      include: "countries",
    }
  );
  const act2 = await actividad.addCountries(datos.Countries);

  res.json(act2);
});

router.get("/countriesdb", async (req, res) => {
  const countriesdb = await Countries.findAll({
    include: [
      {
        model: Activity,
        attributes: ["name", "dificult", "duration", "station", "countriess"],
      },
    ],
  });
  
    res.json(countriesdb);
  
});

router.get("/tabla/:id", async (req, res) => {
  const resu = await Countries.findByPk(req.params.id, {
    include: [
      {
        model: Activity,
        attributes: ["name", "dificult", "duration", "station", "countriess"],
      },
    ],
  });

  res.json(resu);
});

router.get("/tabla", async (req, res) => {
  const resu = await Activity.findAll();

  res.json(resu);
});
module.exports = router;
