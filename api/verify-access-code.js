module.exports = function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const expectedCode = process.env.APP_ACCESS_CODE;
  if (!expectedCode) {
    return response.status(503).json({ ok: false, message: "Access code is not configured." });
  }

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
    if (body.length > 2048) request.destroy();
  });

  request.on("end", () => {
    try {
      const parsed = JSON.parse(body || "{}");
      const submittedCode = String(parsed.code || "");
      if (submittedCode === expectedCode) {
        return response.status(200).json({ ok: true });
      }
      return response.status(401).json({ ok: false, message: "Incorrect access code." });
    } catch (_error) {
      return response.status(400).json({ ok: false, message: "Invalid request." });
    }
  });
};
