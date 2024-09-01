 
fetch('/info/get-exhibitions')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        displayExhibitions(data);
    })
    .catch(error => {
        console.error('Error fetching exhibitions:', error);
        // Handle errors, show error message, retry, etc.
    });


    function displayExhibitions(exhibitions) {
        const exhibitionsContainer = document.getElementById('exhibitions');
    
        exhibitions.forEach(exhibition => {
            const card = document.createElement('div');
            card.classList.add('exhibition-card');
    
            const info = document.createElement('div');
            info.classList.add('exhibition-info');
    
            const title = document.createElement('h2');
            title.textContent = exhibition.title;
    
            const date = document.createElement('p');
            date.textContent = `Date: ${new Date(exhibition.date).toLocaleDateString()}`;
    
            const artists = document.createElement('p');
            artists.textContent = `Artists: ${exhibition.artists.join(', ')}`;
    
            const description = document.createElement('p');
            description.textContent = exhibition.description;
    
            const location = document.createElement('p');
            location.textContent = `Location: ${exhibition.location}`;
            
            const contact = document.createElement('div');
            contact.classList.add('contact-info');
    
            const contactName = document.createElement('p');
            contactName.textContent = `Contact Name: ${exhibition.contact.name}`;
    
            const contactEmail = document.createElement('p');
            contactEmail.textContent = `Contact Email: ${exhibition.contact.email}`;
    
            const contactPhone = document.createElement('p');
            contactPhone.textContent = `Contact Phone: ${exhibition.contact.phone}`;
    
            contact.appendChild(contactName);
            contact.appendChild(contactEmail);
            contact.appendChild(contactPhone);
    
            info.appendChild(title);
            info.appendChild(date);
            info.appendChild(artists);
            info.appendChild(description);
            info.appendChild(location);
            info.appendChild(contact);
    
            card.appendChild(info);
    
            exhibitionsContainer.appendChild(card);
        });
    }
    
