// Originally from HackTheBox's Horror Feeds
// Modified by An00bRektn on https://github.com/Lewis-Cyber-Defense/cfc-green

import "firebase/firestore"
const db = firebase.firestore()

function toggleInputs(state) {
	$("#title").prop("disabled", state);
	$("#blogbody").prop("disabled", state);
	$("#post-btn").prop("disabled", state);
}

function createpost() {
	console.log("Hello Mom!")

	toggleInputs(true);

	const title = $("#title").val();
	const body = $("#blogbody").val();
	if ($.trim(title) === '' || $.trim(body) === '') {
		toggleInputs(false);
        alert('A Title and Body are required!')
		return;
	}
	db.collection("blogs").add({
		name: title,
		body: body
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});

	/** 
    // TODO: Do we need to include the user here?
    // Addendum: We'll probably need to have a session cookie or
    //           something here
	const data = {
		title: title,
		post: body
	};

    // TODO: Temporary until we understand how we're posting things
	await fetch('/api/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then((response) => response.json()
			.then((resp) => {
				if (response.status == 200) {
                    // TODO: Set this redirect to work properly
					window.location.href = '/dashboard';
                    return;
				}
			}))
		.catch((error) => {
			alert('Something went wrong!')
		});

	toggleInputs(false);*/
}