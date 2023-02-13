
const total_funcionarios = document.querySelector('.total_funcionarios');
const empresa_mais_antiga = document.querySelector('.empresa_mais_antiga');
const total_setor = document.querySelector('.total_setor');
const regiao_industrial = document.querySelector('.regiao_industrial');

const queryDois = async () => {
    const res = await _supabase.rpc('empresa_mais_antiga');

    if (res) {
        empresa_mais_antiga.innerHTML = `${res.data}`
    }
}

const queryTres = async () => {
    const res = await _supabase.rpc('consulta_regiao_industria');

    if (res) {
        regiao_industrial.innerHTML = `${res.data}`;
    }
}

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

    setores.sort()
    setores.reverse()

    total_setor.innerHTML = `
        <p>${setores[0][0]} - ${setores[0][1]} Empresas</p><br>
        <p>${setores[1][0]} - ${setores[1][1]} Empresas</p><br>
        <p>${setores[2][0]} - ${setores[2][1]} Empresas</p><br>
        <p>${setores[3][0]} - ${setores[3][1]} Empresas</p><br>
    `
}

const queryCinco = async () => {
    const res = await _supabase.rpc('total_funcionarios');
    if(res) {
        total_funcionarios.innerHTML = `${res.data}`
    }

}

const montaTela = async () => {
    queryDois();
    queryTres();
    queryQuatro();
    queryCinco();
}

montaTela()
