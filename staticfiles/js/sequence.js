function moreinfo(name){
    row=document.getElementById(name);
        fetch(`http://127.0.0.1:8000/sequences/${name}`)
        .then((res) => res.json())
        .then((data)=>   {
            if (row.innerHTML==''){

            row.innerHTML=`
            <table>
            <thead>
                <tr><th>MINVALUE</th><th>MAXVALUE</th><th>INCREMENT BY</th><th>START WITH</th><th>CACHE</th><th>CYCLE</th></tr>
            </thead>
            <tbody><td>${data.sequence.MINVALUE}</td><td>${data.sequence.MAXVALUE}</td><td>${data.sequence.INCREMENT_BY}</td>
            <td>${data.sequence.START_WITH}</td><td>${data.sequence.CACHE}</td><td>${data.sequence.CYCLE}</td></tbody>
        
            </table>
            `;           
            }else{
                row.innerHTML='';
            }
        } )
        
}