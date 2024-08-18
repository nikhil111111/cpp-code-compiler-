const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    try {
        await fs.promises.writeFile(filepath, content);
        return filepath;
    } catch (err) {
        console.error('Error writing file:', err); // Log error details
        throw err;
    }
};

module.exports = {
    generateFile,
};
