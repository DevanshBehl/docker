import { prisma } from "@repo/db";

// Query the DB per request, not at build time (no DB is reachable during `docker build`)
export const dynamic = "force-dynamic";

export default async function Home(){
  const users = await prisma.user.findMany();

  return(<div>
    {JSON.stringify(users)}
  </div>)
}