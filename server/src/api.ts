import Elysia, { t } from "elysia";
import GoogleDrive from "./libs/google/ggdrive";
import Gmail from "./libs/google/gmail";

const googleDriveApi = new Elysia({ prefix: "/ggdrive" })
  .get("/:fileId", ({ params: { fileId } }) => GoogleDrive.view(fileId))
  .delete("/:fileId", ({ params: { fileId } }) => GoogleDrive.delete(fileId))
  .patch("/:fileId", ({ params: { fileId }, body: { testFile } }) => GoogleDrive.update(fileId, testFile), {
    body: t.Object({
      testFile: t.File()
    })
  })
  .post("/", ({ body: { fileName, testFile } }) => GoogleDrive.upload(testFile, fileName, "main"), {
    body: t.Object({
      fileName: t.String(),
      testFile: t.File()
    })
  })
;

const gmailApi = new Elysia({ prefix: "/gmail" })
  .post("/", ({ body }) => Gmail.send(body), {
    body: t.Object({
      to: t.String(),
      subject: t.String(),
      html: t.String(),
    })
  })

const api = new Elysia({ prefix: "/api" })
  .get("/", () => "test api")
  .use(googleDriveApi)
  .use(gmailApi)
;

export default api;