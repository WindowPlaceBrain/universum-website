// NASA APOD API Handler - Simplified
document.addEventListener('DOMContentLoaded', fetchAPOD)

async function fetchAPOD() {
  try {
    // Vereinfachte Anzeige während des Ladens
    const mediaContainer = document.getElementById('media-container')
    mediaContainer.innerHTML = '<p>Lade Bild des Tages...</p>'

    // API-Key
    const apiKey = await fetch('./apikey.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `apikey.txt konnte nicht geladen werden (${response.status})`
          )
        }
        return response.text()
      })
      .then((text) => text.trim())

    // API-Anfrage
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`Fehler ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // Titel aktualisieren
    document.getElementById('title').textContent = data.title

    // Media-Inhalt erstellen
    let mediaHtml = ''

    // Vereinfachte Medien-Typ-Prüfung
    if (data.media_type === 'image') {
      mediaHtml = `<img src="${data.url}" alt="${data.title}" class="apod-image">`
    } else if (data.media_type === 'video') {
      // YouTube-Link anpassen für Embedding
      const videoUrl = data.url.includes('youtube.com')
        ? data.url.replace('watch?v=', 'embed/')
        : data.url

      mediaHtml = `<iframe src="${videoUrl}" class="apod-video" allowfullscreen></iframe>`
    }

    // HTML aktualisieren
    mediaContainer.innerHTML = mediaHtml
    document.getElementById('explanation').textContent = data.explanation
  } catch (error) {
    console.error('APOD Error:', error)
    document.getElementById(
      'media-container'
    ).innerHTML = `<p class="error-message">Fehler beim Laden: ${error.message}</p>`
  }
}
