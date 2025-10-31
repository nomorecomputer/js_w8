const productCardTemplate = (
  item
) => `<li class="productCard"  data-productid="${item.id}">
          <h4 class="productType">新品</h4>
          <h5 class="in-cart hidden"> In Cart </h5>
          <img
            src="${item.images}"
            alt=""
          />
          <a href="#" class="addCardBtn" data-productid="${
            item.id
          }">加入購物車</a>
          <h3>${item.title}</h3>
          <del class="originPrice">NT${toNTDollar(item.origin_price)}</del>
          <p class="nowPrice">NT${toNTDollar(item.price)}</p>
        </li>`;
const cartItemTemplate = (productId, item, qty) => `
  <tr><td>
         <div class="cardItem-title">
             <img src="${item.images}" alt="" />
             <p>${item.title}</p>
          </div>
       </td>
              <td>NT${toNTDollar(item.price)}</td>
              <td>${qty}</td>
              <td>NT${toNTDollar(item.price * qty)}</td>
              <td class="discardBtn">
                <a href="#" class="material-icons delete-cart-item" data-productId="${productId}"> clear </a>
              </td>
            </tr>
`;

const addOrderConstants = {
  inputFormId: "orderInfo-form",
  addOrderBtnId: "orderInfo-btn",
  alertDivClass: "orderInfo-message",
};
let products = [];
let carts = [];
let modalTimerId;
let afterModal = null; // modal 關閉後執行的 callback function

documentLoaded();

function documentLoaded() {
  document.addEventListener("DOMContentLoaded", () => {
    initProducts(configurations.getProductsUrl);
    initCarts(configurations.cartApiUrl);
    registryProductSelect(".productSelect");
    registryCartRelated(configurations.cartApiUrl);
    registryModalMsg();
    registerFrontValidate(addOrderConstants);
    registryAddOrder(addOrderConstants);
  });
}

function registryAddOrder(constants) {
  const addOrderBtnElem = document.getElementById(constants.addOrderBtnId);
  addOrderBtnElem.addEventListener("click", (e) => addOrder(e, constants));
}
function addOrder(e, constants) {
  e.preventDefault();
  if (carts.length === 0) {
    modal_msg_show("無法替 空的購物車 新增訂單！！");
    return;
  }
  const orderFormElem = document.getElementById(constants.inputFormId);
  if (!orderFormElem.reportValidity()) return;

  const inputElems = orderFormElem.querySelectorAll("[name][property]");
  const formData = new FormData(orderFormElem);
  const userInfo = {};
  inputElems.forEach((inputElem) => {
    const key = inputElem.getAttribute("property");
    const value = formData.get(inputElem.getAttribute("name"));
    userInfo[key] = value;
  });

  axios
    .post(configurations.customerOrderApiUrl, { data: { user: userInfo } })
    .then((response) => {
      afterModal = () => {
        orderFormElem.reset();
        fillCarts({ data: { carts: [] } });
        orderFormElem
          .querySelectorAll(`.${constants.alertDivClass}`)
          .forEach((alterDiv) => {
            alterDiv.classList.toggle("hidden", true);
          });
        afterModal = null;
      };
      modal_msg_show("訂單新增成功！", undefined, afterModal);
    })
    .catch((error) => {
      modal_msg_show(`新增訂單失敗！！${error}`, undefined);
    });
}

function initCarts(getApiUrl) {
  axios.get(getApiUrl).then(function (response) {
    fillCarts(response);
  });
}
function registryCartRelated(cartApiUrl) {
  // 加入購物車
  document
    .querySelector(".productWrap")
    .addEventListener("click", function (e) {
      e.preventDefault();
      if (!e.target.classList.contains("addCardBtn")) return;
      const productId = e.target.dataset.productid;
      const originQty =
        carts.find((item) => item.product.id === productId)?.quantity ?? 0;
      axios
        .post(cartApiUrl, {
          data: { productId: productId, quantity: originQty + 1 },
        })
        .then(function (response) {
          fillCarts(response);
        });
    });
  //從購物車刪除單項
  document
    .querySelector(".shoppingCart-table tbody")
    .addEventListener("click", function (e) {
      e.preventDefault();
      if (!e.target.classList.contains("delete-cart-item")) return;
      const productId = e.target.dataset.productid;
      axios
        .delete(cartApiUrl + `/${productId}`)
        .then((response) => fillCarts(response));
    });

  document
    .querySelector(".shoppingCart-table .discardAllBtn")
    .addEventListener("click", function () {
      axios.delete(cartApiUrl).then((response) => fillCarts(response));
    });
}
function registryProductSelect(selector) {
  const selectElem = document.querySelector(selector);
  selectElem.addEventListener("change", () => fillProducts(selectElem.value));
}
function initProducts(productsApiUrl) {
  axios.get(configurations.getProductsUrl).then(function (response) {
    products = response.data.products;
    fillProducts("全部");
  });
}

function fillProducts(filterBy) {
  let result = products.filter(
    (item) => filterBy === "全部" || item.category === filterBy
  );
  if (result.length == 0) modal_msg_show("查無篩選之資料！");

  document.querySelector(".productWrap").innerHTML = result.reduce(
    (acc, item) => (acc += productCardTemplate(item)),
    ""
  );
}
function fillCarts(response) {
  carts = response.data.carts;

  const productIdQtyMap = carts.reduce((map, item) => {
    map.set(item.product.id, item.quantity);
    return map;
  }, new Map());
  // 渲染購物車內容
  document.querySelector(".shoppingCart-table tbody").innerHTML = carts.reduce(
    (acc, item) =>
      (acc += cartItemTemplate(item.id, item.product, item.quantity)),
    ""
  );
  // 渲染購物車總金額
  document.querySelector(
    ".shoppingCart-table .cartsTotalAmount"
  ).textContent = `NT${toNTDollar(response.data.finalTotal)}`;

  document.querySelectorAll(".productDisplay .productCard").forEach((card) => {
    const inCardMsgElem = card.querySelector(".in-cart");
    const productId = card.dataset.productid;
    inCardMsgElem.classList.remove("hidden");
    if (productIdQtyMap.has(productId)) {
      inCardMsgElem.textContent = `已選 * ${productIdQtyMap.get(productId)}`;
    } else {
      inCardMsgElem.classList.add("hidden");
    }
  });
}

function toNTDollar(number) {
  if (typeof number != "number") return "$0";
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

function registryModalMsg() {
  const modalElem = document.querySelector(`#success-modal-overlay .modal`);
  modalElem.addEventListener("click", () => {
    clearTimeout(modalTimerId);
    modalElem.parentElement.classList.remove("active");
    if (afterModal != null) {
      afterModal();
      afterModal = null;
    }
  });
}
function modal_msg_show(msg, timeout = 3000, aftershowHandler = null) {
  const modalOverlayElem = document.getElementById("success-modal-overlay");
  modalOverlayElem.querySelector(".alt-msg-text").textContent = msg;
  modalOverlayElem.classList.add("active");
  modalTimerId = setTimeout(function () {
    modalOverlayElem.classList.remove("active");
    if (aftershowHandler != null) aftershowHandler();
  }, timeout);
}

function modal_msg_close(afterCloseHandler = null) {
  const modalOverlayElem = document.getElementById("success-modal-overlay");
  modalOverlayElem.classList.remove("active");
}
