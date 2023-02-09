// Modal
const modal = document.querySelector('.modal-container');

// Campos
const nome = document.querySelector('#nome');
const dataFundacao = document.querySelector('#dataFundacao');
const numeroFuncionarios = document.querySelector('#numeroFuncionarios');
const regiaoBrasil = document.querySelector('#regiaoBrasil');
const setorAtuacao = document.querySelector('#setorAtuacao');

// Botoes
const save = document.querySelector('#save');

// Função que abre o modal de cadastro de empresas
function abrirModal(edit = false, id = null) {
  //abre o modal
  modal.classList.add('active');

  // Fecha modal caso clicar fora dele
  modal.onclick = (e) => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    preparaModalEditar(id);
  } else {
    nome.value = '';
    dataFundacao.value = '';
    numeroFuncionarios.value = 0;
    regiaoBrasil.value = 'sul';
    setorAtuacao.value = 'industrial';
  }
}

// Função que busca os registros cadastrados
const recarregaTelaConsulta = async () => {
  let tbody = document.getElementById('bodyConsulta')
  let tr = "";

  const res = await _supabase.from('Empresas').select('*');

  if (res) {
    for (var i in res.data) {
      tr += `<tr>
      <td>${res.data[i].nome}</td>
      <td>${res.data[i].dataFundacao}</td>
      <td>${res.data[i].numeroFuncionarios}</td>
      <td>${res.data[i].regiaoBrasil}</td>
      <td>${res.data[i].setorAtuacao}</td>
      <td><button style:"padding-left: 20px;" onclick='abrirModal(true, ${res.data[i].id})' data-bs-target="#editModel"><i class='bx bx-edit' ></button></td>
      <td><button onclick='deletarEmpresa(${res.data[i].id})'><i class='bx bx-trash' ></button></td>
      </tr>`;
    }
    tbody.innerHTML = tr;
  }
}

// // Função que edita um cadastro de empresa
// const preparaModalEditar = async (id) => {
//   // Busca a empresa selecionada
//   const res = await _supabase.from("Empresas").select("*").eq("id", id);

//   // Atribui os dados da empresa aos campos
//   if (res) {
//     nome.value = res.data[0].nome;
//     dataFundacao.value = res.data[0].dataFundacao;
//     numeroFuncionarios.value = res.data[0].numeroFuncionarios;
//     regiaoBrasil.regiaoBrasil = res.data[0].regiaoBrasil;
//     setorAtuacao.value = res.data[0].setorAtuacao;
//   }
// }

// Função que insere a empresa no banco de dados
save.addEventListener('click', async (e) => {
    e.preventDefault();
    save.innerText = 'Cadastrando...';
    save.setAttribute('disabled', true);

    // Inserção da empresa
    let res = await _supabase.from('Empresas').insert({
        nome: nome.value,
        dataFundacao: dataFundacao.value,
        numeroFuncionarios: numeroFuncionarios.value,
        regiaoBrasil: regiaoBrasil.value,
        setorAtuacao: setorAtuacao.value
    })

    if (res) {
        alert('Empresa cadastrada com sucesso!')
        save.innerText = 'Cadastrar';
        save.setAttribute("disabled", false);

        // Recarrega a consulta após o cadastro
        recarregaTelaConsulta();

        // Limpa os campos após o cadastro ser concluído
        nome.value = '';
        dataFundacao.value = '';
        numeroFuncionarios.value = 0;
        regiaoBrasil.value = 'sul';
        setorAtuacao.value = 'industrial';

        modal.classList.remove('active');
    } else {
        alert("Falha ao cadastrar empresa!")
        save.innerText = "Cadastrar"
        save.setAttribute("disabled", false);
    }
});

recarregaTelaConsulta();
