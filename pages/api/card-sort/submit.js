let Validator = require("validatorjs");

export default function handler(req, res) {
  var faunadb = require("faunadb"),
    q = faunadb.query;
  var client = new faunadb.Client({
    secret: process.env.FAUNA_ADMIN_KEY,
    domain: "db.fauna.com",
    port: 443,
    scheme: "https",
  });

  const listRules = {
    title: "required|string|between:3,100",
    closed: "boolean",
    cards: "array",
  };

  const cardRules = {
    title: "required|string|between:3,100",
    id: "required|string|between:1,20",
  };

  const {
    body: { data },
    method,
  } = req;

  switch (method) {
    case "POST":
      let isValid = true;

      if (!data || data.length <= 0) isValid = false;
      else
        data.forEach((list) => {
          let validator = new Validator(list, listRules);
          if (validator.fails()) isValid = false;

          list.cards.forEach((card) => {
            let validator = new Validator(card, cardRules);
            if (validator.fails()) isValid = false;
          });
        });

      if (!isValid) {
        res.status(400).json({
          message: "Invalid data",
        });
        return;
      }

      try {
        var create = client
          .query(
            q.Create(q.Collection("card-sort-submissions"), {
              data: { lists: data },
            })
          )
          .then(function (response) {
            res.status(200).json({ ref: response.ref });
          });

        if (create) {
          res.status(200).json({ ref: create.ref });
        } else {
          res.status(400).json({
            message: "Invalid data",
          });
        }
      } catch (e) {
        res.status(500).end(e.message);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
