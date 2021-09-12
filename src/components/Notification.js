const pushNotification = () => {
	if (!('Notification' in window)) {
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		let notification = new Notification('Vaccines are available!');
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission().then(function (permission) {
			if (permission === 'granted') {
				let notification = new Notification('Vaccines are available!');
			}
		});
	}
};

export { pushNotification };
