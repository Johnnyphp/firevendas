var tabela, posicao, chave;
function Dados(tabela, posicao, chave){
	
	//console.log('TABELA: '+tabela);
	//console.log(localStorage.getItem(tabela));
	
	var linhas = localStorage.getItem(tabela).split('#');
	var quant_linhas = linhas.length;
	//console.log('QUANT LINHAS: '+quant_linhas);	
							
	for(var i=0; i<= quant_linhas; i++){
		
		//console.log('LINHA_'+i+':'+linhas[i]);			
		if(linhas[i] != null){
			//console.log('PASSOU DE NULL '+linhas[i]);		
			var campos = linhas[i].split('|');
			
			if(campos[0] == chave){
				//console.log('PASSOU');
				return campos[posicao];
				break;
			}
		}
	}
	
}