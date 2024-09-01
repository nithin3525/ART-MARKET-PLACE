
function decodeBase64Images(images) {
    images.forEach(imgData => {
        const img = new Image();
        img.src = 'data:image/png;base64,' + imgData.data; // Assuming the data represents PNG images. Adjust accordingly if it's a different format.
        const markup = `
        <div class="card">
        <img id="image" src="${img.src}">
        <p class="para">Artist: ${imgData.name}</p>
        <p class="para">${imgData.description}</p>
        <p class="para">price :: ${imgData.price}</p>
        <div>
            <button class="checkoutBtn"><a href = '/checkout' style="text-decoration:none;">Place Order</a></button>
        </div>
        <div>
        <button class="removeBtn" onclick="removeFromCart('${imgData.id}')"> Remove </button>
        </div>
    </div>   `
        console.log(imgData);
        document.getElementById("root").insertAdjacentHTML('beforeend', markup);
    });
}

fetch('/mycart/cartData')
.then(res => res.json())
.then(data => {
    console.log(data)
    decodeBase64Images(data);
})
.catch(error => {
    console.error('Error fetching images:', error);
    // Handle errors, show error message, retry, etc.
});
       
async function removeFromCart(itemId){
    // console.log("Clicked add to cart")
            console.log("inside adding o cart", itemId);
            await fetch(`/remove-cart-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item:itemId})
            })
            .then(response => {
                if (response.ok) {
                    alert('Item removed from cart successfully!');
                } else {
                    console.error('Failed to add item to cart');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
             
}

