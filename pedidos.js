var temp_lista_pedidos = '';

function gravarPedido(){
	
	temp_lista_pedidos = localStorage.getItem('pedidos');	
	temp_lista_pedidos += $('#numero_pedido').val()+'|'+$('#previsao_entrega').val()+'|'+$('#lista_clientes').val()+'|'+$('#lista_cond_pagto').val()+'|'+$('#lista_negociacao').val()+'|'+$('#lista_percentual_solado').val()+'|'+$('#obs').val()+'|'+$('#tipo_documento').val()+'|'+$('#linha').val()+'#';
	
	localStorage.setItem('pedidos' , temp_lista_pedidos);
	//console.log(localStorage.getItem('pedidos'));
	window.location = 'novo_pedido.html';
}

function cancelarPedido(){

	//console.log(localStorage.getItem('itens_pedido'));

	var temp_lista = '';
	var linhas = localStorage.getItem('itens_pedido').split('#');
	var quant_linhas = linhas.length;
							
	for(var i=0; i<= quant_linhas; i++){
						
		if(linhas[i] != null && linhas[i] != 'undefined'){
						
			var campos = linhas[i].split('|');
			
			
			if(campos[0] != $('#numero_pedido').val()){
			
				temp_lista += campos[0]+'|'+campos[1]+'|'+campos[2]+'|'+campos[3]+'|'+campos[4]+'|'+campos[5]+'|'+campos[6]+'|'+campos[7]+'|'+campos[8]+'|'+campos[9]+'|'+campos[10]+'|'+campos[11]+'|'+campos[12]+'|'+campos[13]+'|'+campos[14]+'|'+campos[15]+'|'+campos[16]+'|'+campos[17]+'|'+campos[18]+'|'+campos[19]+'#';	
				
			}			
		}
	}
	
	localStorage.setItem('itens_pedido', temp_lista);
	//console.log(localStorage.getItem('itens_pedido'));
	window.location = 'novo_pedido.html';
	
}


var temp_lista_itens = '';

function listarItens(){

	$('#tela_cores').hide();
	$('#grade').html('');
	var retorno = '';
	
	var linhas = localStorage.getItem('itens_pedido').split('#');
	var quant_linhas = linhas.length;
							
	for(var i=0; i<= quant_linhas; i++){
						
		if(linhas[i] != null && linhas[i] != 'undefined'){
						
			var campos = linhas[i].split('|');
			
			if( campos[0] == $('#numero_pedido').val()){
				
				retorno += '<table width="100%" border="0" cellspacing="5" cellpadding="0">';
				retorno += '<tr>';
				retorno += '<td width="30%">'+ campos[1] +'</td>';
				retorno += '<td width="30%">'+ Dados('tb_cores', 1, campos[2]) +'</td>';
				
				var lista_grade = '';
				
				for(y=3; y<=17; y++){
					
					if(campos[y] != 'undefined'){
						
						lista_grade += campos[y]+' - ';
					}
				}
								
				retorno += '<td  width="30%">'+lista_grade+'</td>';
				retorno += '<td width="10%">'+ float2moeda( campos[18] ) +'</td>';
				retorno += '</tr>';
				retorno += '</table>';
					
			}
		}
	}
	
	
	$('#lista_de_itens').html(retorno);

}


function adicionarGrade(){
	
	//NUMERO PEDIDO|PRODUTO|COR|N1...N15|PRECO
	//console.log($('#numero_pedido').val()+'|'+$('#lista_produtos').val()+'|'+$('#lista_cores').val()+'|'+$('#n1').val()+'|'+$('#n2').val()+'|'+$('#n3').val()+'|'+$('#n4').val()+'|'+$('#n5').val()+'|'+$('#n6').val()+'|'+$('#n7').val()+'|'+$('#n8').val()+'|'+$('#n9').val()+'|'+$('#n10').val()+'|'+$('#n11').val()+'|'+$('#n12').val()+'|'+$('#n13').val()+'|'+$('#n14').val()+'|'+$('#n15').val()+'|'+$('#preco_atual').val()+'#');
	//localStorage.getItem('itens_pedido', '');
	//console.log('PRIMEIRA VEZ');
	//console.log(localStorage.getItem('itens_pedido'));	
	//console.log();
	
	//Define a Linha do Produto
	var linhas = localStorage.getItem('tb_produtos').split('#');
	var quant_linhas = linhas.length;
							
	for(var i=0; i<= quant_linhas; i++){
						
		if(linhas[i] != null && linhas[i] != 'undefined'){
						
			var campos = linhas[i].split('|');
			
			if(campos[0] == $('#lista_produtos').val())
				var linha = campos[2];
							
		}
	}
	
	var temp_lista_itens = ''+localStorage.getItem('itens_pedido');	
	temp_lista_itens += $('#numero_pedido').val()+'|'+$('#lista_produtos').val()+'|'+$('#lista_cores').val()+'|'+$('#n1').val()+'|'+$('#n2').val()+'|'+$('#n3').val()+'|'+$('#n4').val()+'|'+$('#n5').val()+'|'+$('#n6').val()+'|'+$('#n7').val()+'|'+$('#n8').val()+'|'+$('#n9').val()+'|'+$('#n10').val()+'|'+$('#n11').val()+'|'+$('#n12').val()+'|'+$('#n13').val()+'|'+$('#n14').val()+'|'+$('#n15').val()+'|'+$('#preco_atual').val()+'|'+linha+'#';
	
	localStorage.setItem('itens_pedido' , temp_lista_itens);
	
	//console.log('SEGUNDA VEZ');
	//console.log(localStorage.getItem('itens_pedido'));
	//console.log(localStorage.getItem('itens_pedido'));
	console.log(localStorage.getItem('tb_produtos'));
	
	listarItens();
	
	
}




function AdicionarProdutos(){
	
	
	var r = '';
	if($('#numero_pedido').val() != '' && $('#lista_clientes').val() != ''  && $('#lista_cond_pagto').val() != '' && $('#lista_negociacao').val() != '' && $('#lista_percentual_solado').val() != ''){
		
		$('#msg_1').hide();	
		
		var linhas = localStorage.getItem('tb_produtos').split('#');
		var quant_linhas = linhas.length;
					
			for(var i=1; i<= quant_linhas; i++){
					
				if(linhas[i] != null){
						
					var campos = linhas[i].split('|');
	
					console.log(campos[2]+' / '+$('#linha').val());
					if(campos[2] == $('#linha').val())
						r += '<option value="'+campos[0]+'">'+campos[0]+'</option>';
							
				}
			}
		
		$('#lista_produtos').html(r);
		$('#tela_add_produtos').show();	
		$('#tela_inicio').hide();
		
	}else{
		
		$('#msg_1').show();	
		
	}
	
	
}

var prod = '';
function calculaPreco( prod ){

	//Define preço de Tabela
	//console.log(localStorage.getItem('tb_tabela_de_precos'));
	
	var linhas = localStorage.getItem('tb_tabela_de_precos').split('#');
	var quant_linhas = linhas.length;
							
	for(var i=0; i<= quant_linhas; i++){
						
		if(linhas[i] != null && linhas[i] != 'undefined'){
						
			var campos = linhas[i].split('|');
			
			if(campos[1] == prod){
				
				var preco = campos[2];
				//Percentual Solado
	
				//Condição de Pagamento
				var temp;
								
				var linhas = localStorage.getItem('tb_condicoes_de_pagamento').split('#');
				var quant_linhas = linhas.length;
			
				for(var i=0; i<= quant_linhas; i++){
								
					if(linhas[i] != null){
										
						//Dados do Comissão
						var campos = linhas[i].split('|');
										
							//console.log($('#lista_negociacao').val());
							if(campos[0] == $('#lista_cond_pagto').val() ){
								
								/*
									0	ID
									1	DESCRICAO
									2	TIPO 2=soma 1=subtrai
									3	PERCENTUAL
								*/
								if(! isNull( campos[2] ) ){
									
									if(campos[2] == '1')
										temp = preco - ( preco/100*(campos[3]) );
									else
										temp = preco + ( preco/100*(campos[3]) );
								
								}

								preco = temp;
								
							}
						}
					}
			
				
				//Calcula Comissão
				var temp;
								
				var linhas = localStorage.getItem('tb_tabela_comissoes').split('#');
				var quant_linhas = linhas.length;
			
				for(var i=0; i<= quant_linhas; i++){
								
					if(linhas[i] != null){
										
						//Dados do Comissão
						var campos = linhas[i].split('|');
										
							//console.log($('#lista_negociacao').val());
							if(campos[0] == $('#lista_negociacao').val() ){
								//console.log('PASSOU');		
								/*
									0	ID
									1	DESCRICAO
									2	PERCENTUAL
									3	TIPO 2=soma 1=subtrai
									4	POR 0=percentual 1=valor
									5	VALOR
								*/
											
								//console.log('TIPO: '+campos[4] );
									
								if(campos[4] == '0'){ //por percentual
									//console.log('POR PERCENTUAL');	
									if(campos[3] == '1')
										temp = preco - ( preco/100*(campos[2]) );
									else
										temp = preco + ( preco/100*(campos[2]) );
																				
								}else{ //por valor
									//console.log('POR VALOR');		
									if(campos[3] == '1')
										temp = preco - parseFloat(campos[5]);
									else
										temp = preco + parseFloat(campos[5]);
												
								}
								
								preco = temp;
								
							}
						}
					}
			}
		}
	}
	
	$('#preco_atual').val( preco );
	return float2moeda( preco );

	
	
}

function mostraPreco(){


	$('#preco_produto').html( calculaPreco( $('#lista_produtos').val() ) );	
	
}


function listarCores(){
	
	var retorno = '';
	var linhas = localStorage.getItem('tb_cores').split('#');
	var quant_linhas = linhas.length;
							
	for(var i=0; i<= quant_linhas; i++){
						
		if(linhas[i] != null && linhas[i] != 'undefined'){
						
			var campos = linhas[i].split('|');
			
			if(campos[2] == $('#lista_produtos').val())
				retorno += '<option value="'+ campos[0] +'">'+ campos[1] +'</option>';
							
		}
	}
	
	$('#lista_cores').html(retorno);
}



var ii = 0;

function AdicionarProduto(){

	//localStorage.setItem('itens_pedido', '');
	$('#msg_cor').show();
	
	if($('#lista_produtos').val() != ''){

		$('#msg_2').hide();
		
		var codigo_grade = Dados('tb_produtos', 1, $('#lista_produtos').val());
	
			str_grade = '<table width="100%" border="0" cellspacing="5" cellpadding="0">';
            
			str_grade += '<tr>';
			
			for(var i =1; i<=15; i++){
						
				ii = parseInt(i)+1;
				
				if(Dados('tb_grades', ii, codigo_grade) != '0'){
					str_grade += '<td width="4%" align="left">'+Dados('tb_grades', i+1, codigo_grade)+'</td>';
				}
				
			}
			
            str_grade += '</tr>';
			
			
			str_grade += '<tr>';
			
			for(var i =1; i<=15; i++){
			
				if(Dados('tb_grades', i+1, codigo_grade) != '0'){
					str_grade += '<td width="4%" align="left"><input style="width:45px" maxlength="3" name="n'+i+'" type="text" class="formulario" id="n'+i+'" /></td>';
				}
				
			}
			
            str_grade += '</tr>';
			
			str_grade += '<tr>';
			str_grade += '<td colspan="15"><img style="cursor:pointer" onclick="adicionarGrade()" src="img/bot_adicionar_grade.png" width="226" height="36" alt="Add Grade" />';
			str_grade += '</td>';
			str_grade += '</tr>';
			
            str_grade += '</table>';
		
			//console.log('INICIANDO LISTAGEM DE CORES');
			
			listarCores();
			mostraPreco();
			
			$('#grade').html(str_grade);
			$('#n1').focus();
			
			
			$('#msg_cor').hide();
			$('#tela_cores').show();
			
	
	}else{
	
		$('#msg_2').show();
		
	}

}