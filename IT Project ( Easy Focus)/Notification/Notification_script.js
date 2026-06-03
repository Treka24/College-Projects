const quotes = [
    "Change yourself, and the world changes with you.",
    "Success begins with a single step.",
    "Every failure is a lesson on the path to success.",
    "Persistence makes the impossible possible.",
    "Your mind is your greatest tool."
  ];
  
  const quoteBox = document.getElementById("quoteBox");
  const quoteText = document.getElementById("quoteText");
  const closeBtn = document.getElementById("closeBtn");
  
  let showTimeout;
  let hideTimeout;
  
  function showQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
    quoteBox.classList.add("visible");
  
    hideTimeout = setTimeout(() => {
      quoteBox.classList.remove("visible");
      showTimeout = setTimeout(showQuote, 10000); 
    }, 5000); // Hide after 5 seconds
  }
  
  closeBtn.addEventListener("click", () => {
    quoteBox.classList.remove("visible");
    clearTimeout(hideTimeout);
    clearTimeout(showTimeout);
    showTimeout = setTimeout(showQuote, 10000); 
  });
  
  setTimeout(showQuote, 3000); 
  