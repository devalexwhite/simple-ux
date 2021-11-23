let Validator = require("validatorjs");

export default function handler(req, res) {
  var faunadb = require("faunadb"),
    q = faunadb.query;
  var client = new faunadb.Client({
    secret: process.env.FAUNA_ADMIN_KEY,
    domain: "db.fauna.com",
    // NOTE: Use the correct domain for your database's Region Group.
    port: 443,
    scheme: "https",
  });

  const {
    body: { email },
    method,
  } = req;

  let validation = new Validator(
    { email },
    {
      email: "required|email",
    }
  );

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  } else if (validation.fails()) {
    res.status(400).end(JSON.stringify(validation.errors));
    return;
  }

  try {
    client
      .query(q.Create(q.Collection("email-subscribers"), { data: { email } }))
      .then(function (response) {
        res.status(200).json({ ref: response.ref });
      });
  } catch (e) {
    res.status(500).end(e.message);
    return;
  }
}
