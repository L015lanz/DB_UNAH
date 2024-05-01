function modalopen(name){
    modal=document.getElementById("base-modal");
    fetch(`https://db-unah-app.azurewebsites.net/sequences/detail/${name}`)        
        .then((res) => res.json())
        .then((data)=>   {
            modal.innerHTML=`<div class="modal">
            <section class="modal-title">Detalles sobre secuencia ${name.toUpperCase()}</section>
            <section class="modal-content">
                <div id="moreinfo-content">
                    <table>
                    <thead>
                        <tr><th>MINVALUE</th><th>MAXVALUE</th><th>INCREMENT BY</th><th>START WITH</th><th>CACHE</th><th>CYCLE</th></tr>
                    </thead>
                    <tbody><td>${data.sequence.MINVALUE}</td><td>${data.sequence.MAXVALUE}</td><td>${data.sequence.INCREMENT_BY}</td>
                    <td>${data.sequence.START_WITH}</td><td>${data.sequence.CACHE}</td><td>${data.sequence.CYCLE}</td></tbody>
                
                    </table>
                </div>
                <div class="modal-footer"> 
                   <div class="btn close-btn" onclick="modalclose()">Cerrar</div>
                </div>
            </section>
            </div>`;    
            modal.className+='modal-container';
        } )
        
}


function moreinfo(name){
    row=document.getElementById(name);
    infobtn=document.getElementById("info"+name);
        fetch(`https://db-unah-app.azurewebsites.net/sequences/${name}`)
        .then((res) => res.json())
        .then((data)=>   {
            if (row.innerHTML==''){

            row.innerHTML=`
            <div class="row-content">
                <div class="more"><div class="btn-show" onclick="modalopen('${name}')">ver mas..</div></div>
                <pre class="json">CREATE SEQUENCE ${name.toUpperCase()} ${data.sequence.CONTENT}</pre>
            </div>
            `;
            infobtn.innerHTML='<i class="fa-solid fa-angle-up"></i>';           
            }else{
                row.innerHTML='';
                infobtn.innerHTML='<i class="fa-solid fa-angle-down"></i>';
            }
        } )     
}
