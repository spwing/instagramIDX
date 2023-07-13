function moveup(element) {
    // Get the parent element
    var parentElement = element.parentNode;
    element.textContent = '✓'; 
    console.log(parentElement);

    // Move the parent element to the top
    parentElement.parentNode.prepend(parentElement);
  }

window.onload = function() {
    document.getElementById('linkForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting normally
  
      var form = event.target;
      var formData = new FormData(form);
      console.log(formData.get('summary'));
  
      fetch('https://api.hustlerform.com/api/get-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: formData.get('summary'),
          number: 30
        })

      })
      .then(function(response) {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error('Error generating text, try again.');
        }
      })
      .then(function(data) {
        console.log(data)
        // Assuming the response is stored in a variable called 'response'
        const bulletPoints = data['response'].split('\n');

        // Get the container element where the textboxes will be added
        const container = document.getElementById('textboxContainer');
        container.innerHTML = '';

        // Create a textbox for each bullet point, starting from index 1
        for (let i = 1; i < bulletPoints.length; i++) {
            const bulletPoint = bulletPoints[i].replace(/^\d+\.\s*/, ''); // Remove the numbering
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.value = bulletPoint.trim();
            textbox.id = "textbox";
            container.appendChild(textbox);
        }
      })
        .catch(function(error) {
          console.error('Error:', error.message);
        });
    });
  };

  