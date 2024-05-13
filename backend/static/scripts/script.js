function scrollToContainer() {
    document.getElementById('checkpoint').scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('input[name="option"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        if (event.target.value === 'youtube') {
            document.getElementById('file-upload').style.display = 'none';
            document.getElementById('text-field').style.display = 'block';
            document.querySelector('#text-field label').textContent = "Enter Youtube Link:";

        } else if (event.target.value === 'pdf' || event.target.value === 'pdf') {
            document.getElementById('text-field').style.display = 'none';
            document.getElementById('file-upload').style.display = 'block';
        } else if (event.target.value === 'website' || event.target.value === 'website') {
            document.getElementById('file-upload').style.display = 'none';
            document.getElementById('text-field').style.display = 'block';
            document.querySelector('#text-field label').textContent = "Enter URL:";
        }

    });
});

document.getElementById('process-btn').addEventListener('click', async () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Please select an option.');
        return;
    }

    const optionValue = selectedOption.value;
    let formData = new FormData();

    if (optionValue === 'youtube') {
        const linkInput = document.getElementById('input').value.trim();
        if (!linkInput) {
            alert('Please enter a YouTube link.');
            return;
        }
        formData.append('option', optionValue);
        formData.append('link', linkInput);
    } else if (optionValue === 'pdf' || optionValue === 'pdf') {
        const fileInput = document.getElementById('file');
        if (fileInput.files.length === 0) {
            alert('Please upload a file.');
            return;
        }
        formData.append('option', optionValue);
        formData.append('file', fileInput.files[0]);
    } else if (optionValue === 'website') {
        const linkInput = document.getElementById('input').value.trim();
        if (!linkInput) {
            alert('Please enter a valid url.');
            return;
        }
        formData.append('option', optionValue);
        formData.append('link', linkInput);
    }

    try {
        const response = await fetch('http://localhost:8000/process', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        if (response.status === 200) {
            window.location.href = "http://localhost:8000/chat"
        }
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});