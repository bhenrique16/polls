import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = fastify();
const prisma = new PrismaClient();

app.post("/polls", async (request, reply) => {
  const createPoolBody = z.object({
    title: z.string(),
  });
  const { title } = createPoolBody.parse(request.body);

  const poll = await prisma.polls.create({
    data: {
      title,
    },
  });

  return reply.status(201).send({ pollID: poll.id });
});

app.listen({ port: 3333 }).then(() => {
  console.log("http server running");
});
