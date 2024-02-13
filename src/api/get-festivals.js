async function getFestivals() {
  const url = `${import.meta.env.VITE_API_URL}/festivals`;

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    const fallbackError = "Error festching festivals";
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    // TODO: check if backend uses `detail` or `message` to throw error message.
    const errorMessage = data?.details ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await response.json();
}

export default getFestivals;
