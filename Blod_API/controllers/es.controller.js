const es = require("elasticsearch");
const client = es.Client({ host: "http://localhost:9200" });

async function index(index, body) {
  try {
    //console.log(index, body);
    await client.index({
      index: index,
      body: body,
    });
    return "Index success";
  } catch (err) {
    return err;
  }
}
async function search(index, body) {
  const data = await client.search({
    index: index,
    body: {
      from: 0,
      size: 100,
      //sort: [{ authorID: "asc" }],
      query: {
        // query_string: {
        //   //default_field: "title",
        //   query: `*${body}*`,
        //   fields: ["title", "slug", "authorID"],
        // },
        wildcard: {
          title: {
            value: `*${body}*`,
          },
        },
      },
      _source: ["title", "slug", "authorID"],
    },
  });
  return data;
}
async function delIndex(index) {
  try {
    await client.indices.delete({
      index: index,
    });
    return "index cleared!";
  } catch (err) {
    return err;
  }
}
module.exports = { index, search, delIndex };
