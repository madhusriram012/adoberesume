import axios from "axios";
const credentials = {
    username: "admin",
    password: "admin"
}
/**
 * For simplicity, the function fetches token with username and password and pass the token to /resume endpoint
 * In real scenario, the login would be added separately
 * @param pdfBody
 * @returns {Promise<void>}
 */
export const loginAndGeneratePdf = async (pdfBody) => {
    await axios.post("http://localhost:8081/login/", credentials).then(async (res) => {
        await generatePdf(res.data.accessToken, pdfBody)
    })
};

const generatePdf = async(accessToken, pdfBody) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${accessToken}`
    };
    await axios.post(
        "http://localhost:8081/resume/",
        pdfBody,
        {responseType: 'arraybuffer', headers: headers}
    ).then((res) => {
        const blob = new Blob([res.data], {type: 'application/pdf'});
        const link = document.createElement('a');
        link.download = 'resume.pdf';
        link.href = URL.createObjectURL(blob);
        link.click();
    });
}
