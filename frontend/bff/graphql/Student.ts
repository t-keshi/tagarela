import axios from "axios";
import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Student = objectType({
  name: "Student",
  definition: (t) => {
    t.int("id");
    t.string("content");
    t.int("likes");
  },
});

export const StudentQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("Students", {
      type: "Student",
      async resolve() {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/topis`
        );
        const result = res.data as {
          id: number;
          content: string;
          likes: number;
        }[];

        return result;
      },
    });
  },
});

export const StudentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createStudent", {
      type: "Student",
      args: {
        content: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topis`, {
          content: args.content,
        });
      },
    });
  },
});
