const chalk = require("chalk");
process.stdin.on("data", function(data) {
  console.log(data.toString());
  console.log(`Received ${data.length} bytes.`);
  let parsed;
  try {
    parsed = JSON.parse(data.toString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  parsed.applications.map(element => {
    element.categories = JSON.stringify(element.categories);
    return element;
  });

  console.log(parsed.applications);
});
