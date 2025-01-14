import Elysia, { t } from "elysia";
import GoogleDrive from "./libs/google/ggdrive";

const api = new Elysia({ prefix: "/api" })
  .get("/", () => "test api")
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

export default api;