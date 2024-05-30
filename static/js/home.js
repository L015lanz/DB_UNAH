function modalopen(name,url){
    fullURL=window.location.origin+url;
    modal=document.getElementById("base-modal");
    modal.innerHTML=`<div class="modal">
                    <section class="modal-title"></section>
                    <section class="modal-content">
                        <div id="moreinfo-content">
                        <a href="${fullURL}" >${name}</a>
                       
                        </div>
                        <div class="modal-footer"> 
                           <div class="btn close-btn" onclick="modalclose()">Cerrar</div>
                        </div>
                    </section>
                    </div>`;    
    modal.className+='modal-container';
}