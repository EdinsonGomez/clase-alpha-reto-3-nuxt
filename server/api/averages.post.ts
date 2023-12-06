import { textToDocs } from "~/utils/fileUtils";
import { saveAverages } from "../lib/firestoreRequest";

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);
    
    if (body?.length) {
      const contentFile = body[0].data.toString();
      const docs = textToDocs(contentFile);
      await saveAverages(docs);
    }

    return {}
  } catch(error) {
    console.error('Error upload file: ', error);
    throw createError({
      statusCode: 400,
      message: 'No se ha podido procesar el archivo'
    })
  }
})