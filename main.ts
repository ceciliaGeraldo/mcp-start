async ({ city }) => {
    // 1. Geolocalización
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
    const data = await response.json();
  
    if (!data.results || data.results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No se encontró información para la ciudad ${city}`
          }
        ]
      };
    }
  
    // 2. Extraer coordenadas
    const { latitude, longitude } = data.results[0];
  
    // 3. Obtener clima
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&forecast_days=1`
    );
    const weatherData = await weatherResponse.json();
  
    // 4. Devolver resultado al LLM
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weatherData, null, 2),
        }
      ]
    };
  }