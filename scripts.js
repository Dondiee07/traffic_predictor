document.getElementById("predictForm").addEventListener("submit", async function(event) {
  event.preventDefault();  // Prevent the form from reloading the page

  const location = document.getElementById("location").value;
  const time = document.getElementById("time").value;
  const dayOfWeek = document.getElementById("dayOfWeek").value;
  const weather = document.getElementById("weather").value;

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "none";  // Hide result section initially

  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {  // Use the correct backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: location,
        time: time,
        dayOfWeek: dayOfWeek,
        weather: weather,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.classList.remove("error");
      resultDiv.classList.add("success");
      resultDiv.innerHTML = `<strong>Prediction:</strong> ${data.prediction} <br><strong>Reason:</strong> ${data.reason}`;
    } else {
      resultDiv.classList.remove("success");
      resultDiv.classList.add("error");
      resultDiv.innerHTML = `Error: ${data.message || "Something went wrong."}`;
    }
  } catch (error) {
    resultDiv.classList.remove("success");
    resultDiv.classList.add("error");
    resultDiv.innerHTML = `Error: ${error.message}`;
  }

  resultDiv.style.display = "block";  // Show the result section
});
