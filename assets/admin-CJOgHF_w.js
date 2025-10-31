import"./main-BA0gT57F.js";import"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";const i={path:"jshomework8api",token:"y0GMcWJJbvYDIumS5Jx4TUA40cp1"},u={OrderAdminApiUrl:`https://livejs-api.hexschool.io/api/livejs/v1/admin/${i.path}/orders`};function g(t){const e=[];t.forEach(n=>{n.products.forEach(d=>{e[d.category]=(e[d.category]||0)+d.price*d.quantity})});const r=[];t.forEach(n=>{n.products.forEach(d=>{r[d.title]=(r[d.title]||0)+d.price*d.quantity})});const c=Object.entries(r).sort((n,d)=>d[1]-n[1]),m=c.splice(3);c.length>=1&&c.push(["其他",m.reduce((n,d)=>(n+=d[1],n),0)]),c3.generate({bindto:"#chart-LV2",size:{width:360,height:360},data:{type:"pie",columns:Object.entries(e)}}),c3.generate({bindto:"#chart-LV3",size:{width:360,height:360},data:{type:"pie",columns:c}})}const a={orderBodyId:"order-body",statusAnchorClass:"statusAnchor",deletBtnClass:"delSingleOrder-Btn",deleteAllId:"discardAllBtn"},y=t=>`<p>${t.title} ${t.price}*${t.quantity} </p>`,A=t=>t.reduce((e,r)=>(e+=y(r),e),""),f=t=>`<tr>
              <td>${t.id}</td>
              <td>
                <p>${t.user.name}</p>
                <p>${t.user.tel}</p>
              </td>
              <td>${t.user.address}</td>
              <td>${t.user.email}</td>
              <td>
                <p>${A(t.products)}</p>
              </td>
              <td>${I(t.createdAt)}</td>
              <td class="orderStatus">
                <a href="#" class="statusAnchor" style="display: block" data-id="${t.id}" 
                data-status="${t.paid}">${t.paid?"已處理":"未處理"}</a>
              </td>
              <td>
                <input type="button" class="delSingleOrder-Btn" value="刪除" 
                   data-id="${t.id}"  />
              </td>
            </tr>`;let p,s=[];document.addEventListener("DOMContentLoaded",E);function E(){B(),v(),$(),O()}function $(){document.getElementById(a.deleteAllId).addEventListener("click",()=>{axios.delete(u.OrderAdminApiUrl,{headers:{Authorization:i.token}}).then(e=>{o("刪除全部訂單 成功！！"),s=e.data.orders,h()}).catch(e=>{o(`更新失敗！！${e}`)})})}function v(){document.getElementById(a.orderBodyId).addEventListener("click",e=>{e.target.classList.contains(a.statusAnchorClass)&&(e.preventDefault(),axios.put(u.OrderAdminApiUrl,{data:{id:e.target.dataset.id,paid:e.target.dataset.status==="false"}},{headers:{Authorization:i.token}}).then(r=>{o("更新成功！！"),s=r.data.orders,h()}).catch(r=>{o(`更新失敗！！${r}`)})),e.target.classList.contains(a.deletBtnClass)&&axios.delete(u.OrderAdminApiUrl+`/${e.target.dataset.id}`,{headers:{Authorization:i.token}}).then(r=>{o("刪除成功！！"),s=r.data.orders,h()}).catch(r=>{o(`更新失敗！！${r}`)})})}function B(){axios.get(u.OrderAdminApiUrl,{headers:{Authorization:i.token}}).then(t=>{s=t.data.orders,h()}).catch(t=>{o(`取得訂單失敗！${t} `)})}function h(){const t=document.getElementById(a.orderBodyId);t.innerHTML=s.reduce((e,r)=>(e+=f(r),e),""),g(s)}function O(){const t=document.querySelector("#success-modal-overlay .modal");t.addEventListener("click",()=>{clearTimeout(p),t.parentElement.classList.remove("active")})}function o(t,e=3e3,r=null){const l=document.getElementById("success-modal-overlay");l.querySelector(".alt-msg-text").textContent=t,l.classList.add("active"),p=setTimeout(function(){l.classList.remove("active"),r!=null&&r()},e)}function I(t){return(t+"").length===10&&(t*=1e3),new Date(t).toLocaleDateString()}
