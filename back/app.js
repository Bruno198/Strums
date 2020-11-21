/* Criando a aplicação com AngularJS*/
var app = angular.module("pilas", []);

/* Declarando um controller para nossa aplicação */
app.controller("pilasController", pilasController);

/* Criando a função que será executada pelo controller */
function pilasController($scope, $http) {

    /* Declarando variáveis e objetos do controller*/
    $scope.lancamentos = {};
    $scope.categorias = {};
    $scope.categoria = "";

/// aqui é para o novo lançamento
$scope.lancamento = {
    idcategoria: 0,
    tipo: 0,
    descricao: "",
    valor: 0, 
}

$scope.lancamentoalterado = {};
    /* Declarando funções do controller */
    $scope.listarLancamentos = function(){
        $http
        .get('back/lancamento_listar.php')
        .error(function(){
            alert("falha de comunicação com o back-end")
        })
        .success(function(retorno){
            $scope.lancamentos = retorno;
            console.log($scope.lancamentos);
        });
    }

    $scope.listaCategorias = function(){
        $http
        .get('back/categoria_listar.php')
        .error(function(){
            alert("falha de comunicação com o back-end");
        })
        .success(function(retorno){
            $scope.categorias = retorno;
            console.log($scope.categorias);
        });
    }

    $scope.inserircategoria = function(){
        $http
        .get("back/categoria_inserir.php?categoria="+$scope.categoria)
        .error(function(){
            alert("falha de comunicação com o back-end ao inserir categoria");
        })
        .success(function(retorno){
            if(retorno == 0)
                alert("Não foi possivel inserir a categoria");
            else
            {
                alert("categoria inserida com sucesso");
                $scope.listaCategorias();
            }
                
        });
    }
    $scope.inserirLancamento = function(){
      $scope.url = ("back/lancamento_inserir.php?idcategoria=:idcategoria&tipo=:tipo&descricao=:descricao&valor=:valor");
        $scope.url = $scope.url.replace(":idcategoria",$scope.lancamento.idcategoria);
        $scope.url = $scope.url.replace(":tipo",$scope.lancamento.tipo);
        $scope.url = $scope.url.replace(":descricao",$scope.lancamento.descricao);
        $scope.url = $scope.url.replace(":valor",$scope.lancamento.valor);
        console.log($scope.url);
        $http
        .get($scope.url)
        .error(function(){
            alert("erro");
        })
        .success(function(retorno){
            if(retorno == 0)
            alert("Não foi possivel inserir o lançamento");
        else
        {
            alert("lançamento inserido com sucesso");
            $scope.listarLancamentos();
        }
        });
    }

    $scope.alterarlancamento = function(){
        $scope.url = ("back/lancamento_alterar.php?idlancamento=:idlancamento&descricao=:descricao&valor=:valor");
          $scope.url = $scope.url.replace(":idlancamento",$scope.lancamentoalterado.idlancamento);
          $scope.url = $scope.url.replace(":descricao",$scope.lancamentoalterado.descricao);
          $scope.url = $scope.url.replace(":valor",$scope.lancamentoalterado.valor);
          console.log($scope.url);
          $http
          .get($scope.url)
          .error(function(){
              alert("erro ao alterar");
          })
          .success(function(retorno){
              if(retorno == 0)
              alert("Não foi possivel Alterar lançamento");
          else
          {
              alert("lançamento Alterado com sucesso");
              $scope.listarLancamentos();
          }
          });
      }
  

    $scope.caregarLancamento = function(obejeto){
        $scope.lancamentoalterado = obejeto;
    }

    $scope.excluirlancamento = function(obejeto){
        if (!confirm("Deseja Excluir o Lançamento Agora"))
        return ;
        $http
        .get("back/lancamento_excluir.php?idlancamento="+ obejeto.idlancamento)
        .error(function(){
            alert("Falha Ao Excluir Um Lançamento");
        })
        .success(function(retorno){
            if(retorno == 0)
            alert("Não Foi Possivel Excluir O Lançamento");
            else
            {
                alert("Lançamento Excluido com Sucesso");
                $scope.listarLancamentos();
            }
        });
    }

    /* Chamando funções do controller ao iniciar a aplicação */
    $scope.listarLancamentos();
    $scope.listaCategorias();
 
}