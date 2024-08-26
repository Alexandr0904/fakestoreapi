const headerBtn = document.querySelector(".header__btn");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart__close");
const productTemplate = document.querySelector(".product__template");
const productsBreakfast = document.querySelector(".products-breakfast");
const productsPizza = document.querySelector(".products-pizza");
const productsDrink = document.querySelector(".products-drink");
const productsDesserts = document.querySelector(".products-desserts");
const filterTemplate = document.querySelector(".filter__template");
const filtersBody = document.querySelector(".header__filters");
const cartBody = document.querySelector(".cart__products");
const cartTemplate = document.querySelector(".cart__template");
const headerCount = document.querySelector(".header__count");
const cartCount = document.querySelector(".cart__count");
const cartPrice = document.querySelector(".cart__price");
const cartFullprice = document.querySelector(".cart__info-fullprice");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalImg = document.querySelector(".modal__img");
const modalTitle = document.querySelector(".modal__title");
const modalweight = document.querySelector(".modal__weight");
const modalText = document.querySelector(".modal__text");
const modalItems = document.querySelectorAll(".modal__item");

headerBtn.onclick = openCart;
cartClose.onclick = closeCart;

function openCart() {
  cart.classList.add("cart-active");
}

function closeCart() {
  cart.classList.remove("cart-active");
}
function clearProducts() {
  productsBreakfast.innerHTML = null;
  productsPizza.innerHTML = null;
  productsDrink.innerHTML = null;
  productsDesserts.innerHTML = null;
}
function renderProducts(arr) {
  clearProducts();
  arr.forEach((element) => {
    const clone = productTemplate.content.cloneNode(true);
    // копирует всю HTML разметку шаблона в константу клон
    const img = clone.querySelector(".img");
    const title = clone.querySelector(".product__title");
    const text = clone.querySelector(".product__text");
    const price = clone.querySelector(".product__price");
    const button = clone.querySelector(".product__btn");
    const counter = clone.querySelector(".cart__counter");
    const plus = clone.querySelector(".cart__plus");
    const minus = clone.querySelector(".cart__minus");
    const cartProductCount = clone.querySelector(".cart__product-count");
    const elementIncart = cartArr.find((cartElement) => {
      return cartElement.id == element.id;
    });
    if (elementIncart) {
      cartProductCount.innerHTML = elementIncart.count;
      plus.onclick = function () {
        addToCart(element);
        renderProducts(arr);
      };
      minus.onclick = function () {
        minusCartItem(element);
        renderProducts(arr);
      };
      counter.classList.remove("hidden");
      button.classList.add("hidden");
    } else {
      counter.classList.add("hidden");
      button.classList.remove("hidden");
    }
    button.onclick = function () {
      addToCart(element);
      renderProducts(arr);
    };
    img.src = element.img;
    title.innerHTML = element.title;
    text.innerHTML = element.text;
    price.innerHTML = element.price + " ₽";
    const productsContainer = document.getElementById(element.categoryId);
    productsContainer.append(clone);
  });
}
function renderFilters(arr) {
  arr.forEach((element) => {
    const clone = filterTemplate.content.cloneNode(true);
    const btn = clone.querySelector(".header__filter");
    btn.innerHTML = element.title;
    btn.href = element.link;
    filtersBody.append(clone);
  });
}
function renderCart(arr) {
  headerCount.innerHTML = arr.length;
  cartCount.innerHTML = arr.length;
  const summ = getFullPrice(arr);
  cartPrice.innerHTML = summ;
  cartFullprice.innerHTML = summ + " ₽";
  cartBody.innerHTML = null;
  arr.forEach((element) => {
    const clone = cartTemplate.content.cloneNode(true);
    const img = clone.querySelector(".cart__img");
    const name = clone.querySelector(".cart__name");
    const deleteBtn = clone.querySelector(".cart__btn");
    const price = clone.querySelector(".cart__product-price");
    const minusBtn = clone.querySelector(".cart__minus");
    const count = clone.querySelector(".cart__product-count");
    const plusBtn = clone.querySelector(".cart__plus");
    plusBtn.onclick = function () {
      addToCart(element);
      renderProducts(products);
    };
    minusBtn.onclick = function () {
      minusCartItem(element);
      renderProducts(products);
    };
    deleteBtn.onclick = function () {
      removeCartItem(element);
      renderProducts(products);
    };
    img.src = element.img;
    name.innerHTML = element.title;
    price.innerHTML = element.price + " ₽";
    count.innerHTML = element.count;
    cartBody.append(clone);
  });
}
function getFullPrice(arr) {
  let summ = 0;
  arr.forEach((element) => {
    summ += element.price * element.count;
  });
  return summ;
}
function addToCart(element) {
  const elementIncart = cartArr.find((cartElement) => {
    return cartElement.id == element.id;
  });
  if (elementIncart) {
    elementIncart.count++;
  } else {
    cartArr.push({ ...element, count: 1 });
  }
  renderCart(cartArr);
}
function minusCartItem(element) {
  const elementIncart = cartArr.find((cartElement) => {
    return cartElement.id == element.id;
  });
  if (elementIncart.count > 1) {
    elementIncart.count--;
  }
  renderCart(cartArr);
}
function removeCartItem(element) {
  cartArr = cartArr.filter((cartElement) => {
    return cartElement.id != element.id;
  });
  renderCart(cartArr);
}
renderProducts(products);
renderFilters(categories);
renderCart(cartArr);
