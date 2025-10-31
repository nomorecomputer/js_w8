import"./main-BA0gT57F.js";import"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";function m(t){const e=[];t.forEach(n=>{n.products.forEach(r=>{e[r.category]=(e[r.category]||0)+r.price*r.quantity})});const d=[];t.forEach(n=>{n.products.forEach(r=>{d[r.title]=(d[r.title]||0)+r.price*r.quantity})});const c=Object.entries(d).sort((n,r)=>r[1]-n[1]),h=c.splice(3);c.length>=1&&c.push(["其他",h.reduce((n,r)=>(n+=r[1],n),0)]),c3.generate({bindto:"#chart-LV2",size:{width:360,height:360},data:{type:"pie",columns:Object.entries(e)}}),c3.generate({bindto:"#chart-LV3",size:{width:360,height:360},data:{type:"pie",columns:c}})}const s={orderBodyId:"order-body",statusAnchorClass:"statusAnchor",deletBtnClass:"delSingleOrder-Btn",deleteAllId:"discardAllBtn"},g=t=>`<p>${t.title} ${t.price}*${t.quantity} </p>`,p=t=>t.reduce((e,d)=>(e+=g(d),e),""),f=t=>`<tr>
              <td>${t.id}</td>
              <td>
                <p>${t.user.name}</p>
                <p>${t.user.tel}</p>
              </td>
              <td>${t.user.address}</td>
              <td>${t.user.email}</td>
              <td>
                <p>${p(t.products)}</p>
              </td>
              <td>${v(t.createdAt)}</td>
              <td class="orderStatus">
                <a href="#" class="statusAnchor" style="display: block" data-id="${t.id}" 
                data-status="${t.paid}">${t.paid?"已處理":"未處理"}</a>
              </td>
              <td>
                <input type="button" class="delSingleOrder-Btn" value="刪除" 
                   data-id="${t.id}"  />
              </td>
            </tr>`;let u,a=[];document.addEventListener("DOMContentLoaded",y);function y(){$(),E(),A(),B()}function A(){document.getElementById(s.deleteAllId).addEventListener("click",()=>{axios.delete(configurations.OrderAdminApiUrl,{headers:{Authorization:confidential.token}}).then(e=>{o("刪除全部訂單 成功！！"),a=e.data.orders,l()}).catch(e=>{o(`更新失敗！！${e}`)})})}function E(){document.getElementById(s.orderBodyId).addEventListener("click",e=>{e.target.classList.contains(s.statusAnchorClass)&&(e.preventDefault(),axios.put(configurations.OrderAdminApiUrl,{data:{id:e.target.dataset.id,paid:e.target.dataset.status==="false"}},{headers:{Authorization:confidential.token}}).then(d=>{o("更新成功！！"),a=d.data.orders,l()}).catch(d=>{o(`更新失敗！！${d}`)})),e.target.classList.contains(s.deletBtnClass)&&axios.delete(configurations.OrderAdminApiUrl+`/${e.target.dataset.id}`,{headers:{Authorization:confidential.token}}).then(d=>{o("刪除成功！！"),a=d.data.orders,l()}).catch(d=>{o(`更新失敗！！${d}`)})})}function $(){axios.get(configurations.OrderAdminApiUrl,{headers:{Authorization:confidential.token}}).then(t=>{a=t.data.orders,l()}).catch(t=>{o(`取得訂單失敗！${t} `)})}function l(){const t=document.getElementById(s.orderBodyId);t.innerHTML=a.reduce((e,d)=>(e+=f(d),e),""),m(a)}function B(){const t=document.querySelector("#success-modal-overlay .modal");t.addEventListener("click",()=>{clearTimeout(u),t.parentElement.classList.remove("active")})}function o(t,e=3e3,d=null){const i=document.getElementById("success-modal-overlay");i.querySelector(".alt-msg-text").textContent=t,i.classList.add("active"),u=setTimeout(function(){i.classList.remove("active"),d!=null&&d()},e)}function v(t){return(t+"").length===10&&(t*=1e3),new Date(t).toLocaleDateString()}
