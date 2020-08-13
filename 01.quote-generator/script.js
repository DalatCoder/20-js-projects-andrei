const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote From API
async function getQuote() {
  const proxyUrl = 'https://dalatcoder-proxy-server.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    authorText.innerText = data.quoteAuthor || 'Unknown';

    // Reducre font size for long quote
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    // getQuote();
    console.log('whoops, no quote', error);
  }
}

function tweetQuote() {
  const author = authorText.innerText;
  const quote = quoteText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}.`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
