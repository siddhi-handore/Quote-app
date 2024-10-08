import React, { useState, useEffect } from "react";

function Quote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const categories = ['success', 'men', 'love', 'life', 'intelligence', 'inspirational', 'humor', 'experience', 'amazing', 'attitude', 'alone'];
  const maxLength = 150;
  const maxRetries = 5;  

  const fetchQuote = (retries = 0) => {
    if (loading) return;

    setLoading(true);

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    fetch(`https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`, {
      headers: {
        'X-Api-Key': 'SqjOWg2n9i3NgHJaV8f/hw==p4b6n0G2MdhapMVB'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const fetchedQuote = data[0].quote;
        const fetchedAuthor = data[0].author;

        if (fetchedQuote.length > maxLength && retries < maxRetries) {
          fetchQuote(retries + 1);
        } else if (fetchedQuote.length <= maxLength) {
          setQuote(fetchedQuote);
          setAuthor(fetchedAuthor);
          setLoading(false);
        } else {
          console.error("Couldn't find a quote within length constraints.");
          setLoading(false);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching the quote:", error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchQuote(); 
  }, []);  
  const downloadQuote = () => {
    const element = document.createElement("a");
    const file = new Blob([`"${quote}" - ${author}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "quote.txt"; 
    document.body.appendChild(element); 
    element.click(); 
    document.body.removeChild(element); 
  }
  return (
    <>
      <div className="container">
        <div className="quote">
          <div className="main">
            {/* Loading animation or message */}
            {loading ? (
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <>
                <h1>{quote}</h1>
                <h3>{author}</h3>
              </>
            )}
          </div>
          <div className="icons">
            <div className="i1">
              <button onClick={downloadQuote}>Download</button>
            </div>
            <div className="next">
              <button onClick={() => fetchQuote()} disabled={loading}>New</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quote;
