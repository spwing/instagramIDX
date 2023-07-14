window.onload = function() {
  document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    var form = event.target;
    var formData = new FormData(form);
    console.log(formData.get('email'));
    console.log(formData.get('companyName'));
    console.log(formData.get('name'));

    if (!formData.get('name')) {
      print('here');

    fetch('https://api.hustlerform.com/api/add-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        companyName: formData.get('companyName'),
        ...(formData.get('questions') && { "questions": formData.get('questions') })
      })
    })
     .then(function(response) {
        if (response.ok) {
          return response.json();
          var messageElement = document.getElementById('message');
          messageElement.innerHTML = "Success! Look out for an email from us in 3 days";
        } else {
          throw new Error('Error adding contact');
        }
      })
      .then(function(data) {
        console.log(data.message); // Success message from the server
        // Clear the form fields if needed
        form.reset();
      })
      .catch(function(error) {
        console.error('Error:', error.message);
        // Handle the error and display an error message to the user
      });
    }
  });
};
