function gravarCliente(){
	
	//console.log(localStorage.getItem('tb_temp_clientes'));
	//localStorage.setItem('tb_temp_clientes', '');
	
	//Verifica todos os Dados
	if($('#razao_social').val()	== '' || $('#cnpj').val()	== '' || $('#ie').val()	== '' || $('#endereco').val()	== '' || $('#numero').val()	== '' || $('#bairro').val()	== '' || $('#cep').val() == '' || $('#telefone').val()	== '' || $('#email').val()	== '')
		alert('Alguns Campos de preenchimento obrigatório estão vazios!');
	else{
		
		//Cria ID Unico
		var now = new Date(); 
		var horas = now.getHours(); 
		var minutos = now.getMinutes();
		var segundos = now.getSeconds(); 
		
		var mydate = new Date(); 
		var dia = mydate.getDay(); 
		
		var id_cliente = 'fv_'+horas+minutos+segundos+dia;
		
		
		var temp_clientes = localStorage.getItem('tb_temp_clientes');
		temp_clientes += id_cliente+'|'+$('#estado').val()+'|'+$('#cidades').val()+'|'+$('#razao_social').val()+'|'+$('#cnpj').val()+'|'+$('#ie').val()+'|'+$('#endereco').val()+'|'+$('#numero').val()+'|'+$('#bairro').val()+'|'+$('#cep').val() +'|'+$('#telefone').val()+'|'+$('#email').val()+'|'+$('#obs').val()+'#';
		localStorage.setItem('tb_temp_clientes', temp_clientes);
		
		console.log(localStorage.getItem('tb_temp_clientes'));
		window.location = 'painel.html';
		
	}
}



var uf = '';

function listaCidades(uf){
	
	//console.log(uf);
	
	var retorno = '';
	var linhas = localStorage.getItem('tb_cidades').split('#');
	var quant_linhas = linhas.length;
	quant_linhas -= 2;	
	console.log(localStorage.getItem('tb_cidades'));
							
	for(var i=0; i<= quant_linhas; i++){
						
		if(linhas[i] != null && linhas[i] != 'undefined'){
							
			var campos = linhas[i].split('|');
			
			if(campos[1] == uf)
				retorno += '<option value="'+campos[0]+'">'+campos[2]+'</option>';
								
		}
	}
	
	//console.log(retorno);
	$('#cidades').html(retorno);
	
}


function float2moeda(num) {

   x = 0;

   if(num<0) {
      num = Math.abs(num);
      x = 1;
   }
   if(isNaN(num)) num = "0";
      cents = Math.floor((num*100+0.5)%100);

   num = Math.floor((num*100+0.5)/100).toString();

   if(cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
         num = num.substring(0,num.length-(4*i+3))+'.'
               +num.substring(num.length-(4*i+3));
   ret = num + ',' + cents;
   if (x == 1) ret = ' - ' + ret;return ret;

}

isNull = function(x)
{
	if((x == 'undefined') || (x == null)){return true;}
	else{return false;}
};

isObject = function(x)
{
	if(!isNull(x))
	{
		if(x.constructor == Object){return true;}
		else{return false;}
	}
	else{return false;}
};

isFunction = function(x)
{
	if(!isNull(x))
	{
		if(x instanceof Function){return true;}
		else{return false;}
	}
	else{return false;}
}

isBoolean = function(x)
{
	if(!isNull(x))
	{
		if(x.constructor == Boolean){return true;}
		else{return false;}
	}
	else{return false;}
};

isArray = function(x)
{
	if(!isNull(x))
	{
		if(x.constructor == Array){return true;}
		else{return false;}
	}
	else{return false;}
};

isString = function(x)
{
	if(!isNull(x))
	{
		if(x.constructor == String){return true;}
		else{return false;}
	}
	else{return false;}
};

isDate = function(x)
{
	if(!isNull(x))
	{
		if(x.constructor == Date){return true;}
		else{return false;}
	}
	else{return false;}
};

isNumber = function(x)
{
	if(!isNull(x))
	{
		if(!isNaN(x) && (x.constructor != Boolean) && (x.constructor != Array)){return true;}
		else{return false;}
	}
	else{return false;}
};

isInteger = function(x)
{
	if(!isNull(x))
	{
		if(isNumber(x))
		{
			if((x%1) == 0){return true;}
			else{return false;}
		}
		else{return false;}
	}
	else{return false;}
};

function Sair(){
	
	window.close();	
	
}

var url_txt;
function IrUrl(url_txt){

	$('#carrega').show();

	if(url_txt == '1'){
		url_txt = 'http://www.firevendas.com.br/sistema/empresa/offline/off_novo.php?repres='+localStorage.getItem('codigo_user')+'&empresa='+localStorage.getItem('empresa_user');
		window.location = url_txt;
	}else
		window.location = url_txt;
	
}

function SincronizaCatalogo(){

	/*
	$('#carregando_1').show();
	var repres = localStorage.getItem('codigo_user');
	var empresa = localStorage.getItem('empresa_user');
	
	$.ajax({
				
		type: "POST",
		url: "http://www.firevendas.com.br/sistema/empresa/tarefas/sinc_catalogo.php",
		data: "repres="+repres+"&empresa="+empresa,
				
		success: function(retorno){
			
			if(retorno == ''){

				$('#msg_erro').show();
				$('#carregando_1').hide();
			
			}else{
				
				$('#carregando_1').hide();
				$('#msg_sucesso').show();	
			}
			
			
			
			
		}
	});
	*/
}

function verificaTabelas(){

	$('#carregando_1').show();
	var versao = '1.0';
	
	console.log('VERIFICA TABELAS');
	
	var repres = localStorage.getItem('codigo_user');
	var empresa = localStorage.getItem('empresa_user');
	
	$.ajax({
				
		type: "POST",
		url: "http://www.firevendas.com.br/sistema/empresa/tarefas/sinc_representante.php",
		data: "repres="+repres+"&empresa="+empresa+"&versao="+versao,
				
		success: function(retorno){
			
			console.log(retorno);
			
			if(retorno == 'ERRO VERSAO'){
				
				alert('Seu sistema esta desatualizado, por favor entre no site da empresa e baixe a nova versão.');
				window.location = 'index.html';
							
			}else if(retorno == ''){
				console.log('Não foi possível sincronizar as tabelas, sem acesso a internet.');
				localStorage.setItem('status_user', 'Você esta offline.');
			}else{
				
				localStorage.setItem('status_user', 'Você esta online.');
				
				//Limpa as Tabela
				localStorage.setItem('tb_tabela_de_precos', '');
				
				//Monta um Estrutura de dados Local
				var tabelas = retorno.split('----');
				var quant_tabelas = tabelas.length;
				
				//console.log('TOTAL DE TABELAS: '+quant_tabelas);
				
				for(var i=0; i<= quant_tabelas; i++){
					
					console.log('Nº TABELA '+i);
					
					if(i == 0){ //Tabela Clientes
						
						localStorage.setItem('tb_clientes', tabelas[i]);
						//console.log('GRAVOU: tb_clientes');
						
						
					}else if(i == 1){ //Tabela Produtos
						
						localStorage.setItem('tb_produtos', tabelas[i]);
						//console.log('GRAVOU: tb_produtos');
						
					}else if(i == 2){ //Tabela de Preços
						
						localStorage.setItem('tb_tabela_de_precos', tabelas[i]);
						
						
					}else if(i == 3){ //Tabela de Marcas
						
						localStorage.setItem('tb_marcas', tabelas[i]);
						//console.log('GRAVOU: tb_marcas');
						
					}else if(i == 4){ //Tabela de Tipos de Documentos / Local Cobrança
						
						localStorage.setItem('tb_tipo_documento', tabelas[i]);
						//console.log('GRAVOU: tb_tipo_documento');
						
					}else if(i == 5){ //Tabela de Comissões
						
						localStorage.setItem('tb_tabela_comissoes', tabelas[i]);
						//console.log('GRAVOU: tb_tabela_comissoes');
						
					}else if(i == 6){ //Tabela Condições de Pagamento
						
						localStorage.setItem('tb_condicoes_de_pagamento', tabelas[i]);
						//console.log('GRAVOU: tb_condicoes_de_pagamento');
						
					}else if(i == 7){ //Tabela Percentual Solado
						
						localStorage.setItem('tb_percentual_solado', tabelas[i]);
						//console.log('GRAVOU: tb_percentual_solado');
						
					}else if(i == 8){ //Tabela Grades
						
						localStorage.setItem('tb_grades', tabelas[i]);
						//console.log('GRAVOU: tb_grades');
						
					}else if(i == 9){ //Tabela de Cores
						
						localStorage.setItem('tb_cores', tabelas[i]);
						//console.log('GRAVOU: tb_grades');
						
					}else if(i == 10){ //Tabela de Estados
						
						localStorage.setItem('tb_estados', tabelas[i]);
						//console.log('GRAVOU: tb_grades');
						
					}else if(i == 11){ //Tabela de Cidades
						
						localStorage.setItem('tb_cidades', tabelas[i]);
						//console.log('GRAVOU: tb_grades');
						
					}else if(i == 12){ //Tabela de Tipo de Documentos
						
						localStorage.setItem('tb_tipos_documentos', tabelas[i]);
						//console.log('GRAVOU: tb_grades');
						
					}else if(i == 13){ //Tabela de Linhas de Produção
						
						localStorage.setItem('tb_linhas', tabelas[i]);
						//console.log('GRAVOU: tb_grades');
						
					}
					
					
					
					console.log(tabelas[i]);
					
				}
				
				console.log('MOSTRANDO CATALOGO DIGITAL: '+localStorage.getItem('tb_catalogo_digital'));
				console.log('Verificação de Tabelas Concluídas.');
				
				$('#carregando_1').hide();
				window.location = 'painel.html';
		
			}

		}
		
	});
	
}

function autenticaUsuario(){
	
	localStorage.setItem('id_user', '');
	localStorage.setItem('nome_user', '');
	localStorage.setItem('codigo_user', '');
	localStorage.setItem('email_user', '');
	localStorage.setItem('senha_user', '');
	localStorage.setItem('empresa_user', '');
	
	console.log(localStorage.getItem('tb_usuarios'));
			
	var temp = localStorage.getItem('tb_usuarios');
	var linhas = temp.split('#');
	var num_linhas = linhas.length;
	var campos;
		
	for(var i=0; i<= num_linhas; i++){
	
		if(linhas[i] != null){
			
			console.log('TESTE SPLIT: '+linhas[i]);
			campos = linhas[i].split('|');
	
			if(campos[3] == $('#email').val() && campos[4] == $('#senha').val()){
			
				localStorage.setItem('id_user', campos[0]);
				localStorage.setItem('nome_user', campos[1]);
				localStorage.setItem('codigo_user', campos[2]);
				localStorage.setItem('email_user', campos[3]);
				localStorage.setItem('senha_user', campos[4]);
				localStorage.setItem('empresa_user', campos[5]);
				verificaTabelas();
				
				break;
				
			}
		}
	}
	
	if(localStorage.getItem('id_user') == '')
		$('#msg_erro_login').show();
	
}

function verificaNovoUser(){
	
	var temp = localStorage.getItem('tb_usuarios');
	
	if(temp == null){
	
		$('#primeiro_cadastro').show();
			
	}
	
}

function cadastraNovoUser(){

		var novo_user = '1|'+$('#nome').val()+'|'+$('#codigo').val()+'|'+$('#email_cad').val()+'|'+$('#senha_cad').val()+'|'+$('#codigo_empresa').val()+'#';
		localStorage.setItem('tb_usuarios', novo_user);
		$('#primeiro_cadastro').hide();
	
}

function Limpar(){
	
	localStorage.clear();
	
}