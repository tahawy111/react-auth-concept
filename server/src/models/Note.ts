import { DB } from "github-gist-database";

const userSchema = new DB(
  {
    userId: "String",
    title: "String",
    text: "String",
    completed: "Boolean",
    ticket: "Number",
  },
  {
    githubToken: process.env.GIST_TOKEN!,
    projectName: "auth-concept",
    schemaName: "Note",
    gistId: "56682caafde058e75f0f8f55c3d86191",
    timeStamps: true,
  }
);

export default userSchema;
