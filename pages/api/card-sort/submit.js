// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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
    body: { cards },
    method,
  } = req;

  switch (method) {
    case "POST":
      var create = client
        .query(
          q.Create(q.Collection("card-sort-submissions"), { data: { cards } })
        )
        .then(function (response) {
          res.status(200).json({ ref: response.ref });
        });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
