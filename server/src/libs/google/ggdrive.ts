import { google } from "googleapis";
import ggauth from "./ggauth";
import { Readable } from "stream";

const ggdrive = google.drive({
  version: "v3",
  auth: ggauth,
});
const folders = JSON.parse(process.env.GGDRIVE_FOLDERS as string);

class GoogleDrive {
  static async upload(file: File, fileName: string, folder: string) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);
    
    const { data } = await ggdrive.files.create({
      requestBody: {
        name: fileName,
        parents: [folders[folder]]
      },
      media: {
        body: stream,
        mimeType: file.type
      }
    });

    return data.id;
  }
  
  static async view(fileId: string) {
    const { data } = await ggdrive.files.get(
      { fileId, alt: "media", fields: "mimeType" },
      { responseType: "stream" }
    );

    return data;
  }

  static async update(fileId: string, file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    await ggdrive.files.update({
      fileId,
      media: {
        body: stream,
        mimeType: file.type
      }
    });
  }

  static async delete(fileId: string){
    await ggdrive.files.delete({ fileId });
  }
}

export default GoogleDrive;