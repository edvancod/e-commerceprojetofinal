
let menuContent = document.querySelector('.logo');
let menuToggle = menuContent.querySelector('.menu-toggle');
let show = true;

// menuToggle.addEventListener('click', () => {
//     document.body.style.overflow = show ? 'hidden' : 'initial';
//     menuContent.classList.toggle('on', show);
//     show = !show;
// })

let itensCardapio = document.getElementById('itens-cardapio');
let id = 0;
for (const p of produtos) {
    itensCardapio.innerHTML += `
    <div class="item">
    <a href=""><img src="${p.img}" alt="${p.dsImg}"></a>

    <p>
    ${p.nome}  maravilhoso suculento
    </p>
    <span class="price"> R$ ${p.valor},00</span><br>
    
    <button id="id${id}" class="btn">+ Adicionar</button>
</div>
    `;
    id++;
}

let telaCarrinho = document.querySelector('.tela-carrinho');
let continuar = document.querySelector('.continuar');
continuar.addEventListener('click', () => {
    telaCarrinho.classList.toggle('ocultar-tela-carrinho');
})

let compras = document.querySelector('.compras');
compras.addEventListener('click', () => {
    telaCarrinho.classList.toggle('ocultar-tela-carrinho');
    menuToggle.click(); // fechar o menu suspenso nas versões mobile


})



let lsPedido = document.querySelectorAll('.btn');
for (const bt of lsPedido) {
    bt.addEventListener('click', () => {
        let id = bt.id.replace('id', '');
        let car = document.getElementById('car')
        bt.classList.toggle('selecionado');
        if (bt.innerHTML == 'REMOVER') {
            produtos[id].quantidade = 0;
            bt.innerHTML = 'pedir agora'
            car.innerHTML = ` <i class="bi bi-cart2"></i>`

        } else {
            produtos[id].quantidade = 1;
            bt.innerHTML = 'REMOVER';
            car.innerHTML = ` <i class="bi bi-cart-plus"></i>`
        }

        atualizarTabela();
    });
}

let tbody = document.querySelector('tbody');
function atualizarTabela() {
    tbody.innerHTML = '';
    let total = 0;
    let id = 0;
    for (const p of produtos) {
        if (p.quantidade > 0) {
            tbody.innerHTML += `
              <tr>
                            <td><img src="${p.img}"> </td>
                            <td><span class="valor">${p.nome} =R$ ${p.valor},00 </span></td>
                            <td> ${p.quantidade} </td>
                            <td> R$ ${p.quantidade * p.valor},00 </td>
                            <td>
                                <i class="bi bi-plus-square-fill" id="plus${id}"></i>
                    
                                <i class="bi bi-dash-square-fill" id="dash${id}"></i>
                            </td>
                        </tr>
            
           `;
            total += p.quantidade * p.valor;
        }
        id++;
    }
    document.querySelector('#total-pedido').innerHTML = `Valor total do pedido = R$ ${total},00`;
    atualizarPlusDash('plus');
    atualizarPlusDash('dash');
}

function atualizarPlusDash(tipo) {
    let botoes = document.querySelectorAll(`.bi-${tipo}-square-fill`);
    for (const bt of botoes) {
        bt.addEventListener('click', () => {
            let id = bt.id.replace(tipo, '');
            if (tipo == 'plus') {
                produtos[id].quantidade++;
            }
            if (tipo == 'dash') {
                produtos[id].quantidade--;
                if (produtos[id].quantidade < 1) {
                    document.getElementById('id' + id).click();
                }

            }
            atualizarTabela();
        });
    }
}


let enviar = document.querySelector('.enviar');
enviar.addEventListener('click', () => {
    let msg = 'Gostaria de fazer o seguinte pedido : \n';
    let total = 0;
    for (const p of produtos) {
        if (p.quantidade > 0) {
            msg += ` ${p.quantidade}  Humburgue de ${p.nome} quantidade: ${p.valor} = ${p.quantidade * p.valor}\n`;
            total += p.quantidade * p.valor;
        }
    }
    msg += `Total = ${total}`;
    msg = encodeURI(msg);
    let fone = '61985945661'; // aqui coloca o telefone
    let link = `https://api.whatsapp.com/send?phone=${fone}&text=${msg}`;
    window.open(link);
});
