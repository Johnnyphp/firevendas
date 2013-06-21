function autenticaUsuario(){
	
	var temp = localStorage.getItem('tb_usuarios');
	var linhas = temp.split('#');
	var num_linhas = linhas.length;
	var campos;
		
	for(var i=0; i<= num_linhas; i++){
	
		campos = linhas[i].split('|');
		console.log(campos[3]);
		if(campos[3] == $('#email').val() && campos[4] == $('#senha').val()){
		
			VerificaTabelas();	
			break;
			
		}
		
		/*
		alert('ID: '+campos[0]);
		alert('NOME: '+campos[1]);
		alert('CPF/CNPJ: '+campos[2]);
		alert('EMAIL: '+campos[3]);
		alert('SENHA: '+campos[4]);
		*/
		
	}
	
}

function verificaNovoUser(){
	
	var temp = localStorage.getItem('tb_usuarios');
	
	if(temp == null){
	
		$('#primeiro_cadastro').show();
			
	}
	
}

function cadastraNovoUser(){

		var novo_user = '1|'+$('#nome').val()+'|'+$('#cpfcnpj').val()+'|'+$('#email_cad').val()+'|'+$('#senha_cad').val()+'#';
		localStorage.setItem('tb_usuarios', novo_user);
		$('#primeiro_cadastro').hide();
	
}

function Limpar(){
	
	localStorage.clear();
	
}