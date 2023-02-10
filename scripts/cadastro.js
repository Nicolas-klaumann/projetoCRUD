// Modal
const modalCadastrar = document.querySelector('#cadastrar');
const modalEditar = document.querySelector('#editar');

// Campos
const nome = document.querySelector('#nome');
const dataFundacao = document.querySelector('#dataFundacao');
const numeroFuncionarios = document.querySelector('#numeroFuncionarios');
const regiaoBrasil = document.querySelector('#regiaoBrasil');
const setorAtuacao = document.querySelector('#setorAtuacao');

// Botoes
const save = document.querySelector('#save');
const edit = document.querySelector('#edit');

// Função que abre o modalCadastrar
function abrirModalCadastrar() {
  console.log('chegou na função para abrir o modalCadastrar');
  //abre o modalCadastrar
  modalCadastrar.classList.add('active');

  // Fecha modalCadastrar caso clicar fora dele
  modalCadastrar.onclick = (e) => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modalCadastrar.classList.remove('active');
    }
  };

  nome.value = '';
  dataFundacao.value = '';
  numeroFuncionarios.value = 0;
  regiaoBrasil.value = 'sul';
  setorAtuacao.value = 'industrial';
}

// Função que edita um cadastro de empresa
const abrirModalEditar = async (id) => {
  console.log('abriu modal de editar');

  //abre o modalEditar
  modalEditar.classList.add('active');

  // Fecha modalEditar caso clicar fora dele
  modalEditar.onclick = (e) => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modalEditar.classList.remove('active');
    }
  };

  // Busca a empresa selecionada
  const res = await _supabase.from("Empresas").select("*").eq("id", id);

  // Atribui os dados da empresa aos campos
  if (res) {
    document.querySelector('#editID').value = res.data[0].id;
    document.querySelector('#editNome').value = res.data[0].nome;
    document.querySelector('#editDataFundacao').value = res.data[0].dataFundacao;
    document.querySelector('#editNumeroFuncionarios').value = res.data[0].numeroFuncionarios;
    document.querySelector('#editRegiaoBrasil').value = res.data[0].regiaoBrasil;
    document.querySelector('#editSetorAtuacao').value = res.data[0].setorAtuacao;
  }
}

const deletarEmpresa = async (id) => {
  const res = await _supabase.from("Empresas").delete().eq("id", id)

  if (res) {
      alert("Registro Removido com Sucesso!")
      recarregaTelaConsulta();
  } else {
      alert("Não foi possivel remover o registro")
  }
}

// Função que busca os registros cadastrados
const recarregaTelaConsulta = async () => {
  let tbody = document.getElementById('bodyConsulta')
  let tr = "";

  const res = await _supabase.from('Empresas').select('*').order('id', { ascending: false });

  if (res) {
    for (var i in res.data) {
      tr += `<tr>
      <td>${res.data[i].id}</td>
      <td>${res.data[i].nome}</td>
      <td>${res.data[i].dataFundacao}</td>
      <td>${res.data[i].numeroFuncionarios}</td>
      <td>${res.data[i].regiaoBrasil}</td>
      <td>${res.data[i].setorAtuacao}</td>
      <td><button style:"padding-left: 20px;" onclick='abrirModalEditar(${res.data[i].id})'><i class='bx bx-edit' ></button></td>
      <td><button onclick='deletarEmpresa(${res.data[i].id})'><i class='bx bx-trash' ></button></td>
      </tr>`;
    }
    tbody.innerHTML = tr;
  }
}

// Função que insere a empresa no banco de dados
save.addEventListener('click', async (e) => {
    console.log('evento de cadastrar');
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

        modalCadastrar.classList.remove('active');
    } else {
        alert("Falha ao cadastrar empresa!")
        save.innerText = "Cadastrar"
        save.setAttribute("disabled", false);
    }
});

// Função que edita a empresa no banco de dados
edit.addEventListener('click', async (e) => {
  console.log('evento de Editar');
  e.preventDefault();
  edit.innerText = 'Editando...';
  edit.setAttribute('disabled', true);

  console.log(document.querySelector('#editID'));
  console.log(document.querySelector('#editID').value);

  //atribui os dados para editar
  let id = document.querySelector('#editID').value;
  let nome = document.querySelector('#editNome').value;
  let dataFundacao = document.querySelector('#editDataFundacao').value;
  let numeroFuncionarios = document.querySelector('#editNumeroFuncionarios').value;
  let regiaoBrasil = document.querySelector('#editRegiaoBrasil').value;
  let setorAtuacao = document.querySelector('#editSetorAtuacao').value;

  // Edição da empresa
  let res = await _supabase.from('Empresas').update({
      nome,
      dataFundacao,
      numeroFuncionarios,
      regiaoBrasil,
      setorAtuacao
  }).eq('id', id)

  if (res) {
      alert('Empresa alterada com sucesso!')
      edit.innerText = 'Editar';
      edit.setAttribute("disabled", false);

      // Recarrega a consulta após o cadastro
      recarregaTelaConsulta();

      modalEditar.classList.remove('active');
  } else {
      alert("Falha ao alterar empresa!")
      edit.innerText = "Editar"
      edit.setAttribute("disabled", false);
  }
});

recarregaTelaConsulta();
