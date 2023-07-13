function typeWriter(textElement, delay) {
    const text = textElement.innerHTML;
    let i = 0;
    textElement.innerHTML = '';
    console.log(textElement)
    console.log(textElement.parentElement)
    textElement.parentElement.className = textElement.parentElement.className.replace('notYetTyped','message');
  
    function type() {
      if (i < text.length) {
        textElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, delay);
      }
    }
  
    type();
  }
  
  // Usage:
  document.addEventListener('DOMContentLoaded', function() {
    const numOfTextElements = 5;
    totalWait = 0;
    const delay = 50; // Delay between each character in milliseconds

    for (i = 1; i <= numOfTextElements; i++) {
        const textElement = document.getElementById('textElement'+i);
        setTimeout(function() {
            typeWriter(textElement, delay);
        }, totalWait); // Delay the second typing animation
        totalWait += textElement.innerHTML.length*delay+1000;
    }


    
  });
