let deferredPrompt

window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent the mini-infobar from appearing on mobile
	e.preventDefault()
	// Stash the event so it can be triggered later.
	deferredPrompt = e
	// Optionally, send analytics event that PWA install promo was shown.
	console.log(`'beforeinstallprompt' event was fired.`)
})

window.addEventListener('installClick', async () => {
	// Show the install prompt
	deferredPrompt.prompt()
	// Wait for the user to respond to the prompt
	const { outcome } = await deferredPrompt.userChoice
	// Optionally, send analytics event with outcome of user choice
	console.log(`User response to the install prompt: ${outcome}`)
	// We've used the prompt and can't use it again, throw it away
	deferredPrompt = null
})

window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
  });
