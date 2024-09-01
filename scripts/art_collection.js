let subMenu = document.getElementById("subMenu");
function toggleMenu(){
  subMenu.classList.toggle("open-menu");
  document.getElementById('root').classList.toggle("blur-background")
}
 
fetch('/username')
.then(res => res.json())
.then(data => {  
    document.querySelector('.user-info a').innerHTML = data.name; 
});

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
            <button class="addToCartBtn" onclick="handleAddToCart('${imgData.itemId}')"> ${imgData.btn ? 'Added to Cart' : 'Add to Cart'}</button>
        </div>
    </div>   `
    console.log(imgData);
    document.querySelector(".arts").insertAdjacentHTML('beforeend', markup);
});
}

fetch('/image-data/images')
.then(res => res.json())
.then(data => {
    decodeBase64Images(data);
})
.catch(error => {
    console.error('Error fetching images:', error);
    // Handle errors, show error message, retry, etc.
});





async function handleAddToCart(itemId){
    // console.log("Clicked add to cart")
            console.log("inside adding o cart", itemId);
            await fetch(`/add_to_cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item:itemId})
            })
            .then(response => {
                if (response.ok) {
                    alert('Item added to cart successfully!');
                } else {
                    console.error('Failed to add item to cart');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
             
}

