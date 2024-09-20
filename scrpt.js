const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show new quote
function NewQuote() {
  quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote.text);
  // check author if exists
  if (!quote.author) {
    authorText.textContent = "Unknown author ";
  } else {
    authorText.textContent = quote.author;
  }
  // quote size test
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

// get quotes from api
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    NewQuote();
    // console.log(apiQuotes[15]);
  } catch (error) {
    alert(error);
  }
}

// to tweet a qoute

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
  window.open(twitterUrl, "_blank");
}

// event listers
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
