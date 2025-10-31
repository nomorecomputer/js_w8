import { rePlotting } from "./admin_original";
const constants = {
  orderBodyId: "order-body",
  statusAnchorClass: "statusAnchor",
  deletBtnClass: "delSingleOrder-Btn",
  deleteAllId: "discardAllBtn",
};
const productTemplate = (product) =>
  `<p>${product.title} ${product.price}*${product.quantity} </p>`;
const orderItemProducts = (products) => {
  return products.reduce((acc, product) => {
    acc += productTemplate(product);
    return acc;
  }, "");
};
const orderItemTemplate = (item) => `<tr>
              <td>${item.id}</td>
              <td>
                <p>${item.user.name}</p>
                <p>${item.user.tel}</p>
              </td>
              <td>${item.user.address}</td>
              <td>${item.user.email}</td>
              <td>
                <p>${orderItemProducts(item.products)}</p>
              </td>
              <td>${timeStampToTWFormat(item.createdAt)}</td>
              <td class="orderStatus">
                <a href="#" class="statusAnchor" style="display: block" data-id="${
                  item.id
                }" 
                data-status="${item.paid}">${
  item.paid ? "已處理" : "未處理"
}</a>
              </td>
              <td>
                <input type="button" class="delSingleOrder-Btn" value="刪除" 
                   data-id="${item.id}"  />
              </td>
            </tr>`;
let modalTimerId;
let orders = [];
let afterModal = null;

document.addEventListener("DOMContentLoaded", InitDownloadComplete);

function InitDownloadComplete() {
  loadOrders();
  registryClickProduct();
  registryDiscardAllProduct();
  registryModalMsg();
}

function registryDiscardAllProduct() {
  const deleteAllBtnElem = document.getElementById(constants.deleteAllId);
  deleteAllBtnElem.addEventListener("click", () => {
    axios
      .delete(configurations.OrderAdminApiUrl, {
        headers: { Authorization: confidential.token },
      })
      .then((response) => {
        modal_msg_show("刪除全部訂單 成功！！");
        orders = response.data.orders;
        renderOrders();
      })
      .catch((error) => {
        modal_msg_show(`更新失敗！！${error}`);
      });
  });
}
function registryClickProduct() {
  const ordersBodyElem = document.getElementById(constants.orderBodyId);
  ordersBodyElem.addEventListener("click", (e) => {
    if (e.target.classList.contains(constants.statusAnchorClass)) {
      e.preventDefault();
      axios
        .put(
          configurations.OrderAdminApiUrl,
          {
            data: {
              id: e.target.dataset.id,
              paid: e.target.dataset.status === "false" ? true : false,
            },
          },
          { headers: { Authorization: confidential.token } }
        )
        .then((response) => {
          modal_msg_show("更新成功！！");
          orders = response.data.orders;
          renderOrders();
        })
        .catch((error) => {
          modal_msg_show(`更新失敗！！${error}`);
        });
    }
    if (e.target.classList.contains(constants.deletBtnClass)) {
      axios
        .delete(configurations.OrderAdminApiUrl + `/${e.target.dataset.id}`, {
          headers: { Authorization: confidential.token },
        })
        .then((response) => {
          modal_msg_show("刪除成功！！");
          orders = response.data.orders;
          renderOrders();
        })
        .catch((error) => {
          modal_msg_show(`更新失敗！！${error}`);
        });
    }
    return;
  });
}
function loadOrders() {
  axios
    .get(configurations.OrderAdminApiUrl, {
      headers: { Authorization: confidential.token },
    })
    .then((response) => {
      orders = response.data.orders;
      renderOrders();
    })
    .catch((error) => {
      modal_msg_show(`取得訂單失敗！${error} `);
    });
}
function renderOrders() {
  const bodyElem = document.getElementById(constants.orderBodyId);
  bodyElem.innerHTML = orders.reduce((acc, item) => {
    acc += orderItemTemplate(item);
    return acc;
  }, "");

  rePlotting(orders);
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

function timeStampToTWFormat(timestamp) {
  if ((timestamp + "").length === 10) timestamp *= 1000;
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString();
}
