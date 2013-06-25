function Sair(){
	
	window.close();	
	
}

var url_txt;
function IrUrl(url_txt){

	$('#carrega').show();

	if(url_txt == '1'){
		url_txt = 'http://www.firevendas.com.br/sistema/empresa/offline/off3.php?repres='+localStorage.getItem('codigo_user')+'&empresa='+localStorage.getItem('empresa_user');
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
	
	console.log('VERIFICA TABELAS');
	
	var repres = localStorage.getItem('codigo_user');
	var empresa = localStorage.getItem('empresa_user');
	
	$.ajax({
				
		type: "POST",
		url: "http://www.firevendas.com.br/sistema/empresa/tarefas/sinc_representante.php",
		data: "repres="+repres+"&empresa="+empresa,
				
		success: function(retorno){
			
			console.log(retorno);
			
			if(retorno == ''){
				console.log('Não foi possível sincronizar as tabelas, sem acesso a internet.');
				localStorage.setItem('status_user', 'Você esta offline.');
			}else{
				
				localStorage.setItem('status_user', 'Você esta online.');
				
				//Monta um Estrutura de dados Local
				var tabelas = retorno.split('----');
				var quant_tabelas = tabelas.length;
				
				console.log('TOTAL DE TABELAS: '+quant_tabelas);
				
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
						//console.log('GRAVOU: tb_tabela_de_precos');
						
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
						
					}
					
					console.log(tabelas[i]);
					
				}
				
				console.log('MOSTRANDO CATALOGO DIGITAL: '+localStorage.getItem('tb_catalogo_digital'));
				console.log('Verificação de Tabelas Concluídas.');
		
			}
			
			$('#carregando_1').hide();
			window.location = 'painel.html';

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