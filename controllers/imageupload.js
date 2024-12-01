
export default class FileUploadController {
    static async uploadFile(req, res) {
        const uploadfile = req.file;
        if (!uploadfile) {
            return res.status(400).json({
                status: false,
                message: "No file uploaded."
            });
        }
        const { mimetype } = uploadfile;
        const validFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/tiff", "image/webp"];
        if (!validFileTypes.includes(mimetype)) {
            return res.status(400).json({
                status: false,
                message: "Uploaded file type not supported. Only Image/PDF allowed."
            });
        }
        const uploaded_file = {
            fieldname: uploadfile.fieldname,
            filename: uploadfile.filename,
            path: `http://localhost:3001/${uploadfile.path}`
        }
        return res.status(200).json({ status: true, message: "File Uploaded Successfully", file: uploaded_file });
    }
}