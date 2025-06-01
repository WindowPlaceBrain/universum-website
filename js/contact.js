// Email.js Integration für Kontaktformular
document.addEventListener('DOMContentLoaded', function () {
  // Email.js initialisieren - Sicherere Variante mit Environment-Variablen wäre besser
  emailjs.init('9kfQFaNnA14waBRbR')

  // Formular-Event-Handler
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()

      // Sende Email
      emailjs.sendForm('mein-blog', 'template_2o39xom', this).then(
        function () {
          alert('Nachricht erfolgreich gesendet!')
        },
        function (error) {
          alert('Fehler beim Senden der Nachricht: ' + error.text)
        }
      )
    })

  // Easter Egg für den Alien
  const alien = document.getElementById('alien')
  if (alien) {
    alien.addEventListener('click', function () {
      alert('👽 Willkommen, Erdling! 👽')
    })
  }
})
