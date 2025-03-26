import { getUser } from "@/back_end/user";

export async function GET() {
  const user = await getUser();
  return new Response(JSON.stringify({ data: user }));
}
export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response("Hello World");
}
