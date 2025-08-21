export const getAllQuotes = async () => {
  const response = await fetch("http://localhost:4000/api/quotes");
  const quotes = await response.json();
  return quotes;
};

export const addQuote = async (quote: string) => {
  const response = await fetch("http://localhost:4000/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: quote }),
  });
  const data = await response.json();
  return data;
};

export const editQuote = async (id: number, quote: string) => {
  const response = await fetch(`http://localhost:4000/api/quotes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: quote }),
  });
  const data = await response.json();
  return data;
};

export const removeQuote = async (id: number) => {
  const response = await fetch(`http://localhost:4000/api/quotes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
