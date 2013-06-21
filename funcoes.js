function verificaTabelas(){

	console.log('VERIFICA TABELAS');
	
	var repres = localStorage.getItem('codigo_user');
	var empresa = localStorage.getItem('empresa_user');
	
	$.ajax({
				
		type: "POST",
		url: "http://www.firevendas.com.br/sistema/empresa/tarefas/sinc_representante.php",
		data: "repres="+repres+"&empresa="+empresa,
				
		success: function(retorno){
			
			alert(retorno);
			
			if(retorno == '')
				console.log('Não foi possível sincronizar as tabelas, sem acesso a internet.');
			else
				console.log('Tabelas verificadas');
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
		alert('Usuario não encontrado!');
	
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