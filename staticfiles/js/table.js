function moreinfo(name){
    row=document.getElementById(name);
    infobtn=document.getElementById("info"+name);

        fetch(`https://db-unah-app.azurewebsites.net/tables/${name}`)
        .then((res) => res.json())
        .then((data)=>   {
            if (row.innerHTML==''){

            row.innerHTML=`
            <div class="row-content">
                <div class="more"><div class="btn-show" onclick="modalopen('${name}')">ver mas..</div></div>
                <pre class="json">CREATE TABLE ${name.toUpperCase()} ${data.table.CONTENT}</pre>
            </div>
            `;    
            infobtn.innerHTML='<i class="fa-solid fa-angle-up"></i>';           
       
            }else{
                row.innerHTML='';
                infobtn.innerHTML='<i class="fa-solid fa-angle-down"></i>';           
            }
        } )     
}


function modalopen(name){
    modal=document.getElementById("base-modal");
    modal.innerHTML=`<div class="modal">
                    <section class="modal-title">Detalles sobre tabla ${name.toUpperCase()}</section>
                    <section class="modal-content">
                        <div id="moreinfo-content"></div>
                        <div class="modal-footer"> 
                           <div class="btn close-btn" onclick="modalclose()">Cerrar</div>
                        </div>
                    </section>
                    </div>`;    
    modal.className+='modal-container';
}