export default async file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            let contentType = file.type;
            let content = e.target.result.replace("data:" + contentType + ";base64,", "");

            const parts = file.name.split(".");

            parts.pop();

            resolve({"content": content, "content-type": contentType, "name": parts.join("-")});
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}
