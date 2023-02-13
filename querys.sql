-- QUERYS UTILIZADAS

-- CARD 1
create or replace function consulta_nome_regiao_funcionarios()
returns text
language plpgsql
as $$
begin
return(
  with consulta_nome_regiao_funcionario as (
  select
    "regiaoBrasil",
    sum("numeroFuncionarios") as total_funcionarios
  from "Empresas"
  group by "regiaoBrasil"
) select "regiaoBrasil" from consulta_nome_regiao_funcionario order by total_funcionarios desc limit 1
);
end;
$$

create or replace function consulta_numero_regiao_funcionarios()
returns text
language plpgsql
as $$
begin
return(
  with consulta_numero_regiao_funcionario as (
  select
    "regiaoBrasil",
    sum("numeroFuncionarios") as total_funcionarios
  from "Empresas"
  group by "regiaoBrasil"
) select total_funcionarios from consulta_numero_regiao_funcionario order by total_funcionarios desc limit 1
);
end;
$$


-- CARD 2
create or replace function empresa_mais_antiga()
returns text
language plpgsql
as $$
begin
return(
  select nome from "Empresas" where "dataFundacao" = (select min("dataFundacao") from "Empresas")
);
end;
$$


-- CARD 3
create or replace function consulta_regiao_industria()
returns text
language plpgsql
as $$
begin
return(
  with consulta_regiao_industria as (
  select
    "regiaoBrasil",
    count(1) as quantidade
  from "Empresas"
  where "setorAtuacao" = 'industrial'
  group by "regiaoBrasil"
) select "regiaoBrasil" from consulta_regiao_industria order by quantidade desc limit 1
);
end;
$$


-- CARD 4
-- industrial
create or replace function get_industrial()
returns text
language plpgsql
as $$
begin
return(
  select count(*) from "Empresas" where "setorAtuacao" = 'industrial' group by "setorAtuacao"
);
end;
$$

-- serviços
create or replace function get_servicos()
returns text
language plpgsql
as $$
begin
return(
  select count(*) from "Empresas" where "setorAtuacao" = 'servicos' group by "setorAtuacao"
);
end;
$$

-- varejo
create or replace function get_varejo()
returns text
language plpgsql
as $$
begin
return(
  select count(*) from "Empresas" where "setorAtuacao" = 'varejo' group by "setorAtuacao"
);
end;
$$

-- agricola
create or replace function get_agricola()
returns text
language plpgsql
as $$
begin
return(
  select count(*) from "Empresas" where "setorAtuacao" = 'agricola' group by "setorAtuacao"
);
end;
$$


-- CARD 5
create or replace function total_funcionarios()
returns text
language plpgsql
as $$
begin
return(
  select sum("numeroFuncionarios") from "Empresas"
);
end;
$$
