async function loadData() {
    const { data, error } = await _supabase.from('Empresas').select();
    console.table(data);
    console.log(error);
}

loadData();
