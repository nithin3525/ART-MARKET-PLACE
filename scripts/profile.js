//fetching user name
fetch('/username')
.then(res => res.json())
.then(data => {  
    document.querySelector('.welcome-bar h2').innerHTML = "HI " + data.name + " !!"; 
});

//image data fetching
function decodeBase64Images(images) {
    images.forEach(imgData => {
        const img = new Image();
        img.src = 'data:image/png;base64,' + imgData.data; // Assuming the data represents PNG images. Adjust accordingly if it's a different format.
        const markup = `
        <div class="card">
            <img id="image" src="${img.src}">
            <p class="para">Artist: ${imgData.name}</p>
            <p class="para">${imgData.description}</p>
            <div>
                <button class="deleteBtn" onclick="handleDelete('${imgData.itemId}')">DELETE</button>
            </div>
        </div>   `
        console.log(imgData);
        document.getElementById("root").insertAdjacentHTML('beforeend', markup);
    });
    }
    
    fetch('/image-data/profile-posts')
    .then(res => res.json())
    .then(data => {
        decodeBase64Images(data);
    })
    .catch(error => {
        console.error('Error fetching images:', error);
        // Handle errors, show error message, retry, etc.
    });
    
    
    
    
    
async function handleDelete(itemId){
    // console.log("Clicked add to cart")
            console.log("inside adding o cart", itemId);
            await fetch(`/delete-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item:itemId})
            })
            .then(response => {
                if (response.ok) {
                    alert('Item deleted from gallery successfully!');
                } else {
                    console.error('Failed to add item to cart');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
             
}

