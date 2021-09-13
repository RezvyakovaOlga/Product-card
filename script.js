const photos = document.getElementById('photos'),
    titleDiv = document.getElementById('title'),
    quantitySpan = document.getElementById('quantity'),
    descriptionDiv = document.getElementById('description'),
    priceSpan = document.getElementById('price'),
    oldPriceSpan = document.getElementById('old_price'),
    addButton = document.querySelector('.add_to_cart_button'),
    productAdded = document.getElementById('product_added'),
    mainPhoto = document.getElementById('main_photo')

fetch('https://store.tildacdn.com/api/tgetproduct/')
  .then(response => response.json())
  .then(json => {
      const { images, title, quantity, descr, price, priceold } = json;
      const parsedImg = JSON.parse(images);

      //working with images arr
      parsedImg.map((item, i) => {
        const img = new Image();
        img.src = item.img;
        img.id = `img-${i}`;
        img.addEventListener('click', (e) => {
          //remove active class from last checked
          const checked = document.querySelector('.active');
          checked.classList.remove('active');

          //add active class to current clicked element
          e.target.classList.add('active');

          //change main photo
          mainPhoto.src = e.target.src;
        })
        if (i == 0) img.classList.add('miniature', 'active')
        else img.classList.add('miniature');
        photos.appendChild(img);
      })

      //fill all the fields
      mainPhoto.src = parsedImg[0].img
      titleDiv.innerHTML = title;
      quantitySpan.innerHTML = quantity;
      descriptionDiv.innerHTML = descr;
      priceSpan.innerHTML = price;
      oldPriceSpan.innerHTML = priceold;
    })

addButton.addEventListener('click', () => {
  addButton.style.display = 'none';
  productAdded.style.display = 'flex';
})
