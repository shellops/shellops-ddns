const dns = require("native-dns");
const server = dns.createServer({});

server.on("request", function (request, response) {
  const [{ type, name }] = request.question;

  if (type === 1 && name.endsWith(".ip.shellops.link")) {
    response.answer.push(
      dns.A({
        name: name,
        address: name
          .split(".ip.")[0]
          .split(".")
          .slice(-1)[0]
          .replace(/-/g, "."),
        ttl: 600,
      })
    );
    return response.send();
  }

  if (type === 2 && name === "shellops.link") {
    for (let index = 1; index <= 2; index++)
      response.answer.push(
        dns.NS({
          name: "shellops.link",
          data: `ddns${index}.shellops.io`,
          ttl: 600,
        })
      );
    return response.send();
  }

  response.send();
});

server.on("error", function (err) {
  console.error(err);
});

server.serve(53);
