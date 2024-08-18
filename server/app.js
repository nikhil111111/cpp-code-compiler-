const express = require("express");
const cors = require("cors");

const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ hello: "world!" });
});

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    try {
        // Generate the C++ file with content from the request
        const filepath = await generateFile(language, code);
        // Run the file and send the response
        const output = await executeCpp(filepath);

        return res.json({ filepath, output });
    } catch (err) {
        console.error('Error during execution:', err); // Log detailed error information
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

app.listen(5000, () => {
    console.log(`Listening on port 5000!`);
});
