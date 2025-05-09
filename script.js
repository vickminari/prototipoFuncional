let regraEmEdicao = null;
let regras = [
  {
    id: 'PLANREG01',
    nome: 'Controle de sessões de fisioterapia',
    descricao: 'Regra para controlar fisioterapias.',
    cliente: 'Planserv',
    codigo: '60102020',
    condicoes: [],
    criterios: []
  }
];

function carregarTabela(lista) {
  const tbody = document.querySelector('#tabelaRegras tbody');
  tbody.innerHTML = '';
  lista.forEach((r, index) => {
    const row = `
        <tr>
            <td>${r.id}</td>
            <td>${r.nome}</td>
            <td>${r.descricao}</td>
            <td>${r.cliente}</td>
            <td>${r.codigo}</td>
            <td class="actions">
            <div class="botao-matriz">
                <button onclick="visualizarRegra(${index})">Visualizar</button>
                <button onclick="editarRegra(${index})">Alterar</button>
            </div>
            <div class="botao-matriz">
                <button onclick="excluirRegra(${index})">Excluir</button>
                <button onclick="ativarRegra(${index})">Ativar</button>
            </div>
            <div class="botao-matriz">
                <button onclick="desativarRegra(${index})">Desativar</button>
                <button onclick="copiarRegra(${index})">Copiar</button>
            </div>
            </td>
        </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function pesquisar() {
  const cod = document.getElementById('codigo').value.toLowerCase();
  const cli = document.getElementById('cliente').value.toLowerCase();
  const nom = document.getElementById('nome').value.toLowerCase();

  const filtradas = regras.filter(r =>
    r.codigo.toLowerCase().includes(cod) &&
    r.cliente.toLowerCase().includes(cli) &&
    r.nome.toLowerCase().includes(nom)
  );
  carregarTabela(filtradas);
}

function mostrarCadastro() {
  document.getElementById('tela-listagem').classList.add('hidden');
  document.getElementById('tela-cadastro').classList.remove('hidden');
  limparCondicoes();
  limparCritérios();
}

function voltar() {
  regraEmEdicao = null;
  document.getElementById('tela-cadastro').classList.add('hidden');
  document.getElementById('tela-listagem').classList.remove('hidden');
}

function excluirRegra(index) {
  const regra = regras[index];
  const confirmacao = confirm(`Tem certeza que deseja excluir a regra "${regra.nome}" (ID: ${regra.id})?`);

  if (confirmacao) {
    regras.splice(index, 1);
    carregarTabela(regras);
    alert("Regra excluída com sucesso.");
  }
}

function editarRegra(index) {
  const regra = regras[index];
  regraEmEdicao = index;

  document.getElementById('regra-id').value = regra.id;
  document.getElementById('regra-nome').value = regra.nome;
  document.getElementById('regra-desc').value = regra.descricao;
  document.getElementById('regra-cliente').value = regra.cliente;
  document.getElementById('regra-resposta').value = regra.resposta || 'Bloqueio';
  document.getElementById('regra-texto-resposta').value = regra.textoResposta || '';
  document.getElementById('regra-ativada').value = regra.ativada || 'Sim';

  limparCondicoes();
  regra.condicoes.forEach(cond => adicionarCondicao(cond));
  limparCritérios();
  regra.criterios.forEach(crit => adicionarCriterio(crit));

  mostrarCadastro();
}

function visualizarRegra(index) {
    const regra = regras[index];
  
    document.getElementById('view-id').value = regra.id;
    document.getElementById('view-nome').value = regra.nome;
    document.getElementById('view-desc').value = regra.descricao;
    document.getElementById('view-cliente').value = regra.cliente;
    document.getElementById('view-resposta').value = regra.resposta || '';
    document.getElementById('view-texto-resposta').value = regra.textoResposta || '';
    document.getElementById('view-ativada').value = regra.ativada || '';
    document.getElementById('view-criacao').value = regra.dataCriacao || '12/09/2019 - 9h12';
    document.getElementById('view-ativacao').value = regra.dataAtivacao || '12/09/2019 - 10h40';
    document.getElementById('view-autor').value = regra.autor || 'Felipe Moreira';
  
    // Mostrar Condições
    const condList = document.getElementById('view-condicoes');
    condList.innerHTML = '';
    regra.condicoes.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `Atributo: ${c.atributo}, Parâmetros: ${c.parametros}, Operador: ${c.operador}, Valor: ${c.valor}, Conector: ${c.conector}`;
      condList.appendChild(li);
    });
  
    // Mostrar Critérios
    const critList = document.getElementById('view-criterios');
    critList.innerHTML = '';
    regra.criterios.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `Atributo: ${c.atributo}, Parâmetros: ${c.parametros}, Operador: ${c.operador}, Valor: ${c.valor}`;
      critList.appendChild(li);
    });

    document.getElementById('tela-listagem').classList.add('hidden');
    document.getElementById('tela-visualizar').classList.remove('hidden');
}

  function voltarDaVisualizacao() {
    document.getElementById('tela-visualizar').classList.add('hidden');
    document.getElementById('tela-listagem').classList.remove('hidden');
}

function salvarRegra() {
  const id = document.getElementById('regra-id').value.trim();
  const nome = document.getElementById('regra-nome').value.trim();
  const desc = document.getElementById('regra-desc').value;
  const cliente = document.getElementById('regra-cliente').value;
  const resposta = document.getElementById('regra-resposta').value;
  const textoResposta = document.getElementById('regra-texto-resposta').value;
  const ativada = document.getElementById('regra-ativada').value;
  const dataCriacao = document.getElementById('regra-criacao').value;
  const dataAtivacao = document.getElementById('regra-ativacao').value;
  const autor = document.getElementById('regra-autor').value;

  if (!id || !nome) {
    alert("ID e Nome são obrigatórios.");
    return;
  }
  if (regraEmEdicao !== null && regras[regraEmEdicao].id !== id) {
    alert("ID não pode ser alterado.");
    return;
  }

const condicoes = Array.from(document.querySelectorAll('#condicoes tbody tr')).map(tr => {
    const atributo = tr.children[0].querySelector('select').value;
    const parametros = atributo === 'Quantidade' ? tr.children[1].querySelector('input').value : null;
    const operador = tr.children[2].querySelector('select').value;
    const valor = tr.children[3].querySelector('input').value;
    const conector = tr.children[4].querySelector('select').value;

    return { atributo, parametros, operador, valor, conector };
});

  const criterios = Array.from(document.querySelectorAll('#criterios tbody tr')).map(tr => ({
    atributo: tr.children[0].querySelector('input').value,
    parametros: tr.children[1].querySelector('input').value,
    operador: tr.children[2].querySelector('select').value,
    valor: tr.children[3].querySelector('input').value
  }));

  const novaRegra = {
    id, nome, descricao: desc, cliente, codigo: "60102020", resposta, textoResposta, ativada, 
    dataCriacao, dataAtivacao, autor, condicoes, criterios
  };

  if (regraEmEdicao !== null) {
    regras[regraEmEdicao] = novaRegra;
    alert("Regra atualizada com sucesso!");
  } else {
    regras.push(novaRegra);
    alert("Nova regra salva com sucesso!");
  }

  regraEmEdicao = null;
  voltar();
  carregarTabela(regras);
}

function adicionarCondicao() {
  const row = `
    <tr>
      <td>
        <select>
            <option>Tipo da Guia</option><option>Quantidade</option>
        </select>
      <td>
        <select>
          <option>101012020</option><option>10/10/2022</option><option>31/12/2022</option>
        </select>
      </td>
      <td>
        <select>
          <option>></option><option><</option>
          <option>>=</option><option><=</option>
          <option>=</option><option>!=</option>
          <option>Contém</option><option>Não contém</option>
        </select>
      </td>
      <td><input type="text" placeholder="Valor" value="10"></td>
      <td>
        <select><option>E</option><option>OU</option></select>
      </td>
      <td><button onclick="removerLinha(this)">Excluir</button></td>
    </tr>`;
  document.querySelector('#condicoes tbody').insertAdjacentHTML('beforeend', row);
}

function adicionarCriterio() {
  const row = `
    <tr>
      <td><input type="text" placeholder="Atributo"></td>
      <td><input type="text" placeholder="Parâmetros"></td>
      <td>
        <select>
          <option>></option><option><</option>
          <option>>=</option><option><=</option>
          <option>=</option><option>!=</option>
          <option>Contém</option><option>Não contém</option>
        </select>
      </td>
      <td><input type="text" placeholder="Valor"></td>
      <td><button onclick="removerLinha(this)">Excluir</button></td>
    </tr>`;
  document.querySelector('#criterios tbody').insertAdjacentHTML('beforeend', row);
}

function removerLinha(botao) {
  botao.closest('tr').remove();
}

function limparCondicoes() {
  document.querySelector('#condicoes tbody').innerHTML = '';
}

function limparCritérios() {
  document.querySelector('#criterios tbody').innerHTML = '';
}

function ativarRegra(index) {
    regras[index].ativada = "Sim";
    alert(`Regra "${regras[index].nome}" ativada.`);
    carregarTabela(regras);
} 

function desativarRegra(index) {
    regras[index].ativada = "Não";
    alert(`Regra "${regras[index].nome}" desativada.`);
    carregarTabela(regras);
}

function copiarRegra(index) {
    const original = regras[index];
    const novaRegra = {
      ...structuredClone(original), // cópia profunda segura
      id: original.id + '_COPIA'
    };
    regras.push(novaRegra);
    alert(`Regra "${original.nome}" copiada com ID: ${novaRegra.id}`);
    carregarTabela(regras);
}

// Inicializar tabela
carregarTabela(regras);
