import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  const allApps = await prisma.applicationUsage.findMany();

  console.dir(allApps, { depth: null });
}

main();
