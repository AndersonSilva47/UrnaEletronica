////////////CONTROLE DE INTERFACE;

let frase1 = document.querySelector('.dados1 span');
//Para testar pode-se fazer no navegador "dados1.style.display = 'none';"
let cargo = document.querySelector('.dados2 span');
let numberSpace = document.querySelector('.dados3');
let descricao = document.querySelector('.dados4');
let aviso = document.querySelector('.aviso');
let lateralFotos = document.querySelector('.fotos');

////////////CONTROLE DE AMBIENTE;

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votoFinalizado = false;
let votosSessao = [];



////////////FUNÇÕES PARA FUNCIONAMENTO;

function começarEtapa() {
    let etapa = etapas[etapaAtual]; //ETAPA vai receber os dados do etapas.js[etapaAtual]; (EtapaAtual começa com 0---linha 13);
    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.digitos; i++) {
        if (i === 0) {
            numeroHTML += '<div class="dig-numb piscar"></div>';
        } else {
            numeroHTML += '<div class="dig-numb"></div>';
        }
    }

    frase1.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateralFotos.innerHTML = '';
    numberSpace.innerHTML = numeroHTML;

}

function atualizar() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter(item => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0];
        frase1.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br>
                               Partido: ${candidato.partido} <br>`

        let fotosHtml = '';

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].vice) {
                fotosHtml += `<div class="imgs vice"> <img src="img/${candidato.fotos[i].url}" alt="Candidato" /> ${candidato.fotos[i].legenda} </div>`;
            } else {
                fotosHtml += `<div class="imgs"> <img src="img/${candidato.fotos[i].url}" alt="Candidato" /> ${candidato.fotos[i].legenda} </div>`;
            }
        }

        lateralFotos.innerHTML = fotosHtml;
    } else {
        frase1.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="votoNulo piscar">VOTO NULO</div>'
    }
}

////////////FUNÇÕES BASICAS;
function clicou(n) {
    let displayNumber = document.querySelector('.dig-numb.piscar');
    if (displayNumber !== null) {
        displayNumber.innerText = n;
        numero = `${numero}${n}`;

        displayNumber.classList.remove('piscar');
        if (displayNumber.nextElementSibling !== null) {
            displayNumber.nextElementSibling.classList.add('piscar');
        } else {
            atualizar();
        }
    }

    if (votoFinalizado) console.log('Voto Finalizado');

}

function branco() {
    if (numero === '') {
        votoBranco = true;

        frase1.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="votoNulo piscar">VOTO EM BRANCO</div>'
        lateralFotos.innerHTML = '';
        numberSpace.innerHTML = '';

    } else {
        alert('Pressione CORRIGE para votar em BRANCO.')
    }

    if (votoFinalizado) alert('Voto Finalizado');

}

function corrige() {
    começarEtapa();
    if (votoFinalizado) console.log('Voto Finalizado');
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        let voto = `Confirmado: Voto em branco`;

        votosSessao.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })

    } else if (numero.length === etapa.digitos) {
        votoConfirmado = true;
        let voto = `Confimado: Número:${numero}`;

        votosSessao.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })

    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            começarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="finalVoto piscar">FIM</div>';
            votoFinalizado = true;
            console.log(votosSessao);
        }
    }

    if (votoFinalizado) console.log('Voto Finalizado');
}

/////////////Rodando:

começarEtapa();