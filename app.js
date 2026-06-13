const META = 14;

let membros = JSON.parse(localStorage.getItem("membros")) || [];

function salvar(){
    localStorage.setItem("membros", JSON.stringify(membros));
}

function registrar(){

    let nome = document.getElementById("nome").value;
    let rotas = Number(document.getElementById("rotas").value);

    if(!nome || !rotas) return;

    let membro = membros.find(m => m.nome === nome);

    if(membro){
        membro.rotas += rotas;
    }else{
        membros.push({
            nome,
            rotas
        });
    }

    salvar();
    atualizar();

    document.getElementById("nome").value = "";
    document.getElementById("rotas").value = "";
}

function atualizar(){

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let totalRotas = 0;
    let bateram = 0;

    membros.sort((a,b)=>b.rotas-a.rotas);

    membros.forEach(m=>{

        totalRotas += m.rotas;

        if(m.rotas >= META)
            bateram++;

        let porcentagem = (m.rotas/META)*100;

        lista.innerHTML += `
        <div class="membro">
            <h3>${m.nome}</h3>

            <p>${m.rotas}/${META} Rotas
            ${m.rotas >= META ? '✅' : '❌'}</p>

            <div class="barra">
                <div class="progresso"
                style="width:${Math.min(porcentagem,100)}%">
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById("totalMembros").innerText = membros.length;
    document.getElementById("bateramMeta").innerText = bateram;
    document.getElementById("naoBateram").innerText = membros.length - bateram;
    document.getElementById("totalRotas").innerText = totalRotas;
}

atualizar();
