async function getCovidData() {
    const country = document.getElementById('countryInput').value;
    const resultDiv = document.getElementById('result');

    if (!country) {
        resultDiv.innerHTML = `<p>Please enter a country name!</p>`;
        return;
    }

    try {
        const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
        if (!response.ok) {
            throw new Error('Country not found');
        }

        const data = await response.json();

        resultDiv.innerHTML = `
            <h2>${data.country}</h2>
            <p><strong>Cases:</strong> ${data.cases.toLocaleString()}</p>
            <p><strong>Deaths:</strong> ${data.deaths.toLocaleString()}</p>
            <p><strong>Recovered:</strong> ${data.recovered.toLocaleString()}</p>
            <img src="${data.countryInfo.flag}" alt="Flag of ${data.country}" width="100">
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
}
