// Nexss PROGRAMMER 2.0.0 - NodeJS
// Default template for JSON Data
// STDIN
const path = require("path");
process.stdin.on("data", async function(NexssStdin) {
  let NexssStdout;
  try {
    NexssStdout = JSON.parse(NexssStdin.toString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const extension = path.extname(NexssStdout.file || "temp.png");

  // Modify data
  //NexssStdout.NodeJSOutput = `Hello from NodeJS! ${process.version}`;
  const resultFile = NexssStdout.file || `Web-Output${extension}`;
  const website = NexssStdout.website || `https://nexss.com`;
  if (NexssStdout.website && NexssStdout.website.indexOf("http")) {
    console.log("Website must start with http:// OR https://");
    return;
  }
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(website);
  //  await page.type("#search", "Marcin Mapo");
  if (",.png,.jpg,.jpeg,.gif,".indexOf(`,${extension},`) > -1) {
    try {
      await page.screenshot({ path: `${NexssStdout.cwd}/${resultFile}` });
      NexssStdout.file = path.normalize(`${NexssStdout.cwd}/${resultFile}`);
    } catch (error) {
      console.error(error);
    }
  } else if (",.pdf,".indexOf(`,${extension},`) > -1) {
    await page.pdf({ path: `${NexssStdout.cwd}/${resultFile}`, format: "A4" });
    NexssStdout.file = path.normalize(`${NexssStdout.cwd}/${resultFile}`);
  }

  process.stdout.write(JSON.stringify(NexssStdout));

  await browser.close();
  process.exit(0);
});

process.stdin.on("end", function() {
  //On Windows below is not needed.
  return;
});
