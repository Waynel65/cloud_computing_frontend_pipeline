const photoInput = document.getElementById('photo-input');
const customLabels = document.getElementById('custom-labels');
const uploadButton = document.getElementById('upload-button');

// Set up an event listener for the upload button
uploadButton.addEventListener('click', () => {
    const file = photoInput.files[0];
    const labels = customLabels.value;

    if (file) {
        console.log(file.name)
        uploadPhoto(file, labels);
    } else {
        alert('Please select a photo to upload.');
    }
});

function uploadPhoto(file, labels) {
    const customLabelsHeader = labels.split(',').map(label => label.trim()).join(', ');

    // Prepare the parameters for the apigClient.uploadPut call
    var headers = {
        'x-amz-meta-customLabels': customLabelsHeader,
        "filename": file.name,
        'x-api-key': 'VudB6IS5o04aZpdKrDWXL3elyiJF7gsw3lMxDkn9',
    };

// Call the provided apigClient.uploadPut function to get the pre-signed URL
    fetch("https://bgl0q3ljjg.execute-api.us-east-1.amazonaws.com/dev/upload", {
        method: 'PUT',
        body: file,
        headers: headers,
        redirect: 'follow'
    }).then(response => {
        if(response.ok){
            alert('Photo uploaded successfully.');
        }else{
            alert('Photo failed to upload');
        }
    }).catch(error => {
        console.error('Error uploading photo:', error);
        console.log("status code: ", error.status)
        alert('Failed to upload photo.');
    });

}


    // const additionalParams = {
    //     "filename": file.name
    // };


    // Create a Blob from the file
    // const fileBlob = new Blob([file], { type: file.type });

    // Call the provided apigClient.uploadPut function to upload the photo
//     apigClient.uploadPut(params, fileBlob, additionalParams)
//         .then(response => {
//             alert('Photo uploaded successfully.');
//         })
//         .catch(error => {
//             console.error('Error uploading photo:', error);
//             console.log("status code: ", error.status)
//             alert('Failed to upload photo.');
//         });
// }
