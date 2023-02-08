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
function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = (e) => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    console.log('teste editar');
  } else {
    nome.value = '';
    dataFundacao.value = '';
    numeroFuncionarios.value = 0;
    regiaoBrasil.value = 'sul';
    setorAtuacao.value = 'industrial';
  }
}

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

        // Limpa os campos após o cadastro ser concluído
        nome.value = '';
        dataFundacao.value = '';
        numeroFuncionarios.value = 0;
        regiaoBrasil.value = 'sul';
        setorAtuacao.value = 'industrial';

    } else {
        alert("Falha ao cadastrar empresa!")
        save.innerText = "Cadastrar"
        save.setAttribute("disabled", false);
    }
});
