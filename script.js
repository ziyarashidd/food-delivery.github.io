document.addEventListener("DOMContentLoaded", () => {
  let menu = document.querySelector('#menu-bars');
  let navbar = document.querySelector('.navbar');

  if (menu && navbar) {
    menu.onclick = () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    };
  }

  let section = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header .navbar a');

  window.onscroll = () => {
    if (menu && navbar) {
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');
    }

    section.forEach(sec => {
      let top = window.scrollY;
      let height = sec.offsetHeight;
      let offset = sec.offsetTop - 150;
      let id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(links => {
          links.classList.remove('active');
        });
        // Fix typo 'herf' to 'href'
        let activeLink = document.querySelector('header .navbar a[href*="' + id + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  // Search icon toggle
  const searchIcon = document.getElementById('search-icon');
  const searchForm = document.getElementById('search-form');
  const closeBtn = document.getElementById('close');

  if (searchIcon && searchForm) {
    searchIcon.onclick = () => {
      searchForm.classList.toggle('active');
    };
  }

  if (closeBtn && searchForm) {
    closeBtn.onclick = () => {
      searchForm.classList.remove('active');
    };
  }

  // Swiper sliders initialization (assuming Swiper library is loaded)
  if (typeof Swiper !== 'undefined') {
    var swiperHome = new Swiper(".home-slider", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
    });

    var swiperReview = new Swiper(".revie-slider", {
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }
    });
  }

  // Like button functionality
  const hearts = document.querySelectorAll('.fas.fa-heart:not(#liked-icon)');
  const likedContainer = document.getElementById('liked-container-header');

  if (hearts && likedContainer) {
    hearts.forEach(heart => {
      heart.addEventListener('click', event => {
        event.preventDefault();
        heart.classList.toggle('liked');

        const box = heart.closest('.box');
        if (!box) return;

        const img = box.querySelector('img');
        const imgSrc = img ? img.src : '';
        const title = box.querySelector('h3') ? box.querySelector('h3').innerText.trim() : '';
        const priceElement = box.querySelector('.price') || box.querySelector('span');
        const price = priceElement ? priceElement.innerText.trim() : '';

        const uniqueId = btoa(title + imgSrc);

        if (heart.classList.contains('liked')) {
          if (likedContainer.querySelector(`.liked-item[data-id="${uniqueId}"]`)) return;

          const likedItem = document.createElement('div');
          likedItem.classList.add('liked-item');
          likedItem.setAttribute('data-id', uniqueId);

          likedItem.innerHTML = `
            <img src="${imgSrc}" alt="${title}" />
            <div>
              <h4>${title}</h4>
              <span>${price}</span>
            </div>
            <i class="fas fa-trash delete-icon" title="Remove"></i>
          `;

          likedContainer.appendChild(likedItem);

          likedItem.querySelector('.delete-icon').addEventListener('click', () => {
            likedItem.remove();
            heart.classList.remove('liked');
          });

        } else {
          const likedItem = likedContainer.querySelector(`.liked-item[data-id="${uniqueId}"]`);
          if (likedItem) {
            likedItem.remove();
          }
        }
      });
    });
  }

  // Like dropdown toggle
  const likeDropdown = document.querySelector('.like-dropdown');
  const likedIcon = document.getElementById('liked-icon');

  if (likedIcon && likeDropdown) {
    likedIcon.addEventListener('click', function (e) {
      e.preventDefault();
      likeDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!likeDropdown.contains(e.target) && e.target !== likedIcon) {
        likeDropdown.classList.remove('active');
      }
    });
  }

  // Add to cart functionality
  const cartButtons = document.querySelectorAll('.btn');
  const cartContainer = document.getElementById('cart-container-header');
  const cartTotalDisplay = document.getElementById('cart-total');

  function updateCartTotal() {
    if (!cartContainer || !cartTotalDisplay) return;
    let total = 0;
    const cartItems = cartContainer.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
      const priceText = item.querySelector('span') ? item.querySelector('span').innerText.replace('$', '') : '0';
      total += parseFloat(priceText) || 0;
    });
    cartTotalDisplay.textContent = total.toFixed(2);
  }

  if (cartButtons && cartContainer && cartTotalDisplay) {
    cartButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const box = btn.closest('.box');
        if (!box) return;

        const imgSrc = box.querySelector('img') ? box.querySelector('img').src : '';
        const title = box.querySelector('h3') ? box.querySelector('h3').innerText.trim() : '';
        const priceElement = box.querySelector('.price') || box.querySelector('span');
        const price = priceElement ? priceElement.innerText.trim() : '';
        const uniqueId = btoa(title + imgSrc);

        if (cartContainer.querySelector(`.cart-item[data-id="${uniqueId}"]`)) return;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-id', uniqueId);

        cartItem.innerHTML = `
          <img src="${imgSrc}" alt="${title}" />
          <div>
            <h4>${title}</h4>
            <span>${price}</span>
          </div>
          <i class="fas fa-trash delete-cart-icon" title="Remove"></i>
        `;

        cartContainer.appendChild(cartItem);
        updateCartTotal();

        cartItem.querySelector('.delete-cart-icon').addEventListener('click', () => {
          cartItem.remove();
          updateCartTotal();
        });
      });
    });
  }

  // Cart dropdown toggle
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartIcon = document.getElementById('cart-icon');

  if (cartIcon && cartDropdown) {
    cartIcon.addEventListener('click', function (e) {
      e.preventDefault();
      cartDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!cartDropdown.contains(e.target) && e.target !== cartIcon) {
        cartDropdown.classList.remove('active');
      }
    });
  }

  // Buy Now modal
  const buyNowBtn = document.getElementById('buy-now-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutItemsList = document.getElementById('checkout-items-list');
  const checkoutForm = document.getElementById('checkout-form');
  const closeCheckout = document.getElementById('close-checkout');

  if (buyNowBtn && checkoutModal && checkoutItemsList && checkoutForm && cartContainer) {
    buyNowBtn.addEventListener('click', () => {
      checkoutItemsList.innerHTML = "";
      const cartItems = cartContainer.querySelectorAll('.cart-item');
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      cartItems.forEach(item => {
        const id = item.getAttribute('data-id');
        const title = item.querySelector('h4') ? item.querySelector('h4').innerText : '';
        const price = item.querySelector('span') ? item.querySelector('span').innerText : '';

        const checkbox = document.createElement('label');
        checkbox.innerHTML = `
          <input type="checkbox" name="items" value="${id}" checked />
          ${title} - ${price}
        `;
        checkoutItemsList.appendChild(checkbox);
      });

      checkoutModal.style.display = "block";
    });

    if (closeCheckout) {
      closeCheckout.addEventListener('click', () => {
        checkoutModal.style.display = "none";
      });
    }

    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedItems = Array.from(checkoutForm.querySelectorAll('input[name="items"]:checked'));
      if (selectedItems.length === 0) {
        alert("Please select at least one item to buy.");
        return;
      }

      alert("✅ Order placed successfully!");

      selectedItems.forEach(item => {
        const cartItem = cartContainer.querySelector(`.cart-item[data-id="${item.value}"]`);
        if (cartItem) cartItem.remove();
      });

      updateCartTotal();
      checkoutModal.style.display = "none";
      checkoutForm.reset();
    });
  }

  // Search modal and functionality
  const searchBtn = document.getElementById("search-btn");
  const searchBox = document.getElementById("search-box");
  const searchModal = document.getElementById("search-modal");
  const closeModalBtn = document.getElementById("close-search-modal");
  const resultsContainer = document.getElementById("search-results-container");

  if (searchIcon && searchForm && closeBtn && searchBtn && searchBox && searchModal && closeModalBtn && resultsContainer) {

    // Show search form when clicking search icon
    searchIcon.addEventListener("click", () => {
      searchForm.classList.add("active");
      searchBox.focus();
      resultsContainer.innerHTML = "";  // Clear previous results
    });

    // Hide search form when clicking 'X'
    closeBtn.addEventListener("click", () => {
      searchForm.classList.remove("active");
      searchBox.value = "";
      resultsContainer.innerHTML = "";
    });

    // 🔍 Search when clicking search button
    searchBtn.addEventListener("click", performSearch);

    // ⌨️ Search when pressing "Enter"
    searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission
        performSearch();
      }
    });

    function performSearch() {
      const query = searchBox.value.toLowerCase().trim();
      if (!query) {
        alert("Please enter a search term");
        return;
      }

      const boxes = document.querySelectorAll(".box-container .box, .swiper-slide.slide");
      let matchedItems = [];

      boxes.forEach(box => {
        const title = box.querySelector("h3")?.innerText.toLowerCase() || "";
        const desc = box.querySelector("p")?.innerText.toLowerCase() || "";

        if (title.includes(query) || desc.includes(query)) {
          matchedItems.push(box);
        }
      });

      resultsContainer.innerHTML = "";

      if (matchedItems.length > 0) {
        matchedItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.style.marginBottom = "1rem";

          // ❤️ LIKE BUTTON FUNCTIONALITY
          const heart = clone.querySelector('.fa-heart');
          if (heart) {
            heart.addEventListener('click', event => {
              event.preventDefault();
              heart.classList.toggle('liked');

              const img = clone.querySelector('img');
              const imgSrc = img ? img.src : '';
              const title = clone.querySelector('h3') ? clone.querySelector('h3').innerText.trim() : '';
              const priceElement = clone.querySelector('.price') || clone.querySelector('span');
              const price = priceElement ? priceElement.innerText.trim() : '';

              const uniqueId = btoa(title + imgSrc);
              const likedContainer = document.getElementById('liked-container-header');
              if (!likedContainer) return;

              if (heart.classList.contains('liked')) {
                if (likedContainer.querySelector(`.liked-item[data-id="${uniqueId}"]`)) return;

                const likedItem = document.createElement('div');
                likedItem.classList.add('liked-item');
                likedItem.setAttribute('data-id', uniqueId);
                likedItem.innerHTML = `
              <img src="${imgSrc}" alt="${title}" />
              <div>
                <h4>${title}</h4>
                <span>${price}</span>
              </div>
              <i class="fas fa-trash delete-icon" title="Remove"></i>
            `;
                likedContainer.appendChild(likedItem);

                likedItem.querySelector('.delete-icon').addEventListener('click', () => {
                  likedItem.remove();
                  heart.classList.remove('liked');
                });
              } else {
                const likedItem = likedContainer.querySelector(`.liked-item[data-id="${uniqueId}"]`);
                if (likedItem) likedItem.remove();
              }
            });
          }

          // 📦 ADD TO CART BUTTON FUNCTIONALITY
          const cartBtn = clone.querySelector('.btn');
          if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
              e.preventDefault();
              const imgSrc = clone.querySelector('img') ? clone.querySelector('img').src : '';
              const title = clone.querySelector('h3') ? clone.querySelector('h3').innerText.trim() : '';
              const priceElement = clone.querySelector('.price') || clone.querySelector('span');
              const price = priceElement ? priceElement.innerText.trim() : '';
              const uniqueId = btoa(title + imgSrc);

              const cartContainer = document.getElementById('cart-container-header');
              const cartTotalDisplay = document.getElementById('cart-total');
              if (!cartContainer || !cartTotalDisplay) return;

              if (cartContainer.querySelector(`.cart-item[data-id="${uniqueId}"]`)) return;

              const cartItem = document.createElement('div');
              cartItem.classList.add('cart-item');
              cartItem.setAttribute('data-id', uniqueId);

              cartItem.innerHTML = `
            <img src="${imgSrc}" alt="${title}" />
            <div>
              <h4>${title}</h4>
              <span>${price}</span>
            </div>
            <i class="fas fa-trash delete-cart-icon" title="Remove"></i>
          `;

              cartContainer.appendChild(cartItem);
              updateCartTotal();

              cartItem.querySelector('.delete-cart-icon').addEventListener('click', () => {
                cartItem.remove();
                updateCartTotal();
              });
            });
          }

          resultsContainer.appendChild(clone);
        });
      } else {
        resultsContainer.innerHTML = "<p style='font-size: 20px;'>😞 Sorry, no items found!</p>";
      }

      // ✅ Hide the search bar and show only the result modal
      searchForm.classList.remove("active");

      // ✅ Show search results modal
      searchModal.style.display = "block";
    }

    // Modal close logic
    closeModalBtn.onclick = () => {
      searchModal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target === searchModal) {
        searchModal.style.display = "none";
      }
    };
  }



const swiperContainer = document.querySelector('.swiper-container');
const slides = swiperContainer.querySelectorAll('.swiper-slide').length;

const slidesPerView = 3; // your current setting
const slidesPerGroup = 3; // your current setting

const loopEnabled = slides >= slidesPerView && slides >= slidesPerGroup;

const swiper = new Swiper('.swiper-container', {
  slidesPerView: slidesPerView,
  slidesPerGroup: slidesPerGroup,
  loop: loopEnabled,
  // other parameters...
});



  // Loader fade out
  function loader() {
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
      loaderContainer.classList.add('fade-out');
    }
  }

  function fadeOut() {
    setTimeout(loader, 3000);
  }

  window.onload = fadeOut;
});
