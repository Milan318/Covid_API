const countrySelect = document.getElementById('countrySelect');
const statsCard = document.getElementById('stats');
const countryName = document.getElementById('countryName');
const confirmed = document.getElementById('confirmed');
const deaths = document.getElementById('deaths');
const recovered = document.getElementById('recovered');
const lastUpdated = document.getElementById('lastUpdated');

fetch('https://covid-api.com/api/regions')
  .then(res => res.json())
  .then(data => {
    countrySelect.innerHTML = '<option selected disabled>Select a country</option>';
    data.data.forEach(region => {
      if (region.iso && region.name) {
        const option = document.createElement('option');
        option.value = region.iso;
        option.textContent = region.name;
        countrySelect.appendChild(option);
      }
    });
  });

countrySelect.addEventListener('change', () => {
  const iso = countrySelect.value;
  fetch(`https://covid-api.com/api/reports?iso=${iso}`)
    .then(res => res.json())
    .then(data => {
      if (data.data.length > 0) {
        const report = data.data[0];
        countryName.textContent = report.region.name;
        confirmed.textContent = report.confirmed.toLocaleString();
        deaths.textContent = report.deaths.toLocaleString();
        recovered.textContent = report.recovered ? report.recovered.toLocaleString() : 'N/A';
        lastUpdated.textContent = report.date;
        statsCard.classList.remove('d-none');
      } else {
        statsCard.classList.add('d-none');
        alert('No data available for this country.');
      }
    })
    .catch((error)=>{
      console.log(error);
      
    })
});