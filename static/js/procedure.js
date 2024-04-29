function moreinfo(name){
    row=document.getElementById(name);
        fetch(`http://127.0.0.1:8000/procedures/${name}`)
        .then((res) => res.json())
        .then((data)=>   {
            if (row.innerHTML==''){

            row.innerHTML=`
            <pre class="json">CREATE OR REPLACE PROCEDURE ${name} ${data.procedure.CONTENT}</pre>
            `;           
            }else{
                row.innerHTML='';
            }
        } )     
}