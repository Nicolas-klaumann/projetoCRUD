// Busca os campos em que os dados serão inseridos
const total_funcionarios = document.querySelector('.total_funcionarios');
const empresa_mais_antiga = document.querySelector('.empresa_mais_antiga');
const total_setor = document.querySelector('.total_setor');
const regiao_industrial = document.querySelector('.regiao_industrial');
const regiaoNumeroFuncionarios = document.querySelector('.regiaoNumeroFuncionarios');

// Nome da região do brasil que apresenta maior número de funcionários, e o número de funcionários
const queryUm = async () => {
    // busca o nome e a quantidade de funcionarios
    const resNomeRegiao = await _supabase.rpc('consulta_nome_regiao_funcionarios');
    const resNumeroRegiao = await _supabase.rpc('consulta_numero_regiao_funcionarios');

    if (resNomeRegiao || resNumeroRegiao) {
        regiaoNumeroFuncionarios.innerHTML = `${resNomeRegiao.data.toUpperCase()} - ${parseInt(resNumeroRegiao.data)}`;
    }
}

// O nome da empresa mais antiga
const queryDois = async () => {
    // busca a empresa mais antiga
    const res = await _supabase.rpc('empresa_mais_antiga');

    if (res) {
        empresa_mais_antiga.innerHTML = `${res.data.toUpperCase()}`
    }
}

// A região do brasil que tem maior número de empresas do setor Industrial
const queryTres = async () => {
    // busca a região
    const res = await _supabase.rpc('consulta_regiao_industria');

    if (res) {
        regiao_industrial.innerHTML = `${res.data.toUpperCase()}`;
    }
}

// O número de empresas de cada setor de atuação em ordem decrescente
const queryQuatro = async () => {
    // busca o total de cada setor
    const industrial = await _supabase.rpc('get_industrial');
    const varejo = await _supabase.rpc('get_varejo');
    const servicos = await _supabase.rpc('get_servicos');
    const agricola = await _supabase.rpc('get_agricola');

    let setores = [
        ['INDUSTRIAL', industrial.data],
        ['VAREJO', varejo.data],
        ['SERVIÇOS', servicos.data],
        ['AGRICOLA', agricola.data]
    ];

    // organiza ele detro do array
    setores.sort()
    setores.reverse()

    total_setor.innerHTML = `
        <p>${setores[0][0]} - ${setores[0][1]} Empresas</p><br>
        <p>${setores[1][0]} - ${setores[1][1]} Empresas</p><br>
        <p>${setores[2][0]} - ${setores[2][1]} Empresas</p><br>
        <p>${setores[3][0]} - ${setores[3][1]} Empresas</p><br>
    `
}

// O número total de funcionários de todas as empresas
const queryCinco = async () => {
    // busca o total de funcionarios
    const res = await _supabase.rpc('total_funcionarios');
    if(res) {
        total_funcionarios.innerHTML = `${parseInt(res.data)}`
    }

}

// monta a tela com as consultas solicitadas
const montaTela = async () => {
    queryUm();
    queryDois();
    queryTres();
    queryQuatro();
    queryCinco();
}

montaTela();
