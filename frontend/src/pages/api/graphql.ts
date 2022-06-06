import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import Cors from "micro-cors";
import schema from "../../../bff";

const cors = Cors();

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

const serverLaunch = async (req: MicroRequest, res: ServerResponse) => {
  console.log(req, res);
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  console.log("launched server");
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export default cors(serverLaunch);
