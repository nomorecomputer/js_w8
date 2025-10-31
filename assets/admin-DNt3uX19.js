import{c as i,a as u}from"./config-DAZ7FPrF.js";import"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";function g(t){const e=[];t.forEach(a=>{a.products.forEach(r=>{e[r.category]=(e[r.category]||0)+r.price*r.quantity})});const d=[];t.forEach(a=>{a.products.forEach(r=>{d[r.title]=(d[r.title]||0)+r.price*r.quantity})});const c=Object.entries(d).sort((a,r)=>r[1]-a[1]),p=c.splice(3);c.length>=1&&c.push(["其他",p.reduce((a,r)=>(a+=r[1],a),0)]),c3.generate({bindto:"#chart-LV2",size:{width:360,height:360},data:{type:"pie",columns:Object.entries(e)}}),c3.generate({bindto:"#chart-LV3",size:{width:360,height:360},data:{type:"pie",columns:c}})}const o={orderBodyId:"order-body",statusAnchorClass:"statusAnchor",deletBtnClass:"delSingleOrder-Btn",deleteAllId:"discardAllBtn"},y=t=>`<p>${t.title} ${t.price}*${t.quantity} </p>`,f=t=>t.reduce((e,d)=>(e+=y(d),e),""),A=t=>`<tr>
              <td>${t.id}</td>
              <td>
                <p>${t.user.name}</p>
                <p>${t.user.tel}</p>
              </td>
              <td>${t.user.address}</td>
              <td>${t.user.email}</td>
              <td>
                <p>${f(t.products)}</p>
              </td>
              <td>${O(t.createdAt)}</td>
              <td class="orderStatus">
                <a href="#" class="statusAnchor" style="display: block" data-id="${t.id}" 
                data-status="${t.paid}">${t.paid?"已處理":"未處理"}</a>
              </td>
              <td>
                <input type="button" class="delSingleOrder-Btn" value="刪除" 
                   data-id="${t.id}"  />
              </td>
            </tr>`;let m,s=[];document.addEventListener("DOMContentLoaded",E);function E(){v(),B(),$(),L()}function $(){document.getElementById(o.deleteAllId).addEventListener("click",()=>{axios.delete(i.OrderAdminApiUrl,{headers:{Authorization:u.token}}).then(e=>{n("刪除全部訂單 成功！！"),s=e.data.orders,h()}).catch(e=>{n(`更新失敗！！${e}`)})})}function B(){document.getElementById(o.orderBodyId).addEventListener("click",e=>{e.target.classList.contains(o.statusAnchorClass)&&(e.preventDefault(),axios.put(i.OrderAdminApiUrl,{data:{id:e.target.dataset.id,paid:e.target.dataset.status==="false"}},{headers:{Authorization:u.token}}).then(d=>{n("更新成功！！"),s=d.data.orders,h()}).catch(d=>{n(`更新失敗！！${d}`)})),e.target.classList.contains(o.deletBtnClass)&&axios.delete(i.OrderAdminApiUrl+`/${e.target.dataset.id}`,{headers:{Authorization:u.token}}).then(d=>{n("刪除成功！！"),s=d.data.orders,h()}).catch(d=>{n(`更新失敗！！${d}`)})})}function v(){axios.get(i.OrderAdminApiUrl,{headers:{Authorization:u.token}}).then(t=>{s=t.data.orders,h()}).catch(t=>{n(`取得訂單失敗！${t} `)})}function h(){const t=document.getElementById(o.orderBodyId);t.innerHTML=s.reduce((e,d)=>(e+=A(d),e),""),g(s)}function L(){const t=document.querySelector("#success-modal-overlay .modal");t.addEventListener("click",()=>{clearTimeout(m),t.parentElement.classList.remove("active")})}function n(t,e=3e3,d=null){const l=document.getElementById("success-modal-overlay");l.querySelector(".alt-msg-text").textContent=t,l.classList.add("active"),m=setTimeout(function(){l.classList.remove("active"),d!=null&&d()},e)}function O(t){return(t+"").length===10&&(t*=1e3),new Date(t).toLocaleDateString()}
