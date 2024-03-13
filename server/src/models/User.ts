import { DB } from "github-gist-database";

const userSchema = new DB(
  {
    username: "String",
    password: "String",
    roles: "Array",
    active: "Boolean",
  },
  {
    githubToken: process.env.GIST_TOKEN!,
    projectName: "auth-concept",
    schemaName: "user",
    gistId: "ea73e51ae7da3ff4b6692336afba1a86",
    timeStamps: true,
  }
);

export default userSchema;
