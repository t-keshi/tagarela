import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Topic = objectType({
  name: "Topic",
  definition: (t) => {
    t.int("id");
    t.string("content");
    t.int("likes");
  },
});

export const TopicQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("topics", {
      type: "Topic",
      async resolve() {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.json();
      },
    });
  },
});

export const TopicMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTopic", {
      type: "Topic",
      args: {
        content: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: args.content }),
        });

        return { id: 0, content: "success", likes: 0 };
      },
    });
    t.nonNull.field("incrementLikes", {
      type: "Topic",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/${args.id}/likes`,
          {
            method: "POST",
          }
        );

        return { id: 0, content: "success", likes: 0 };
      },
    });
  },
});
