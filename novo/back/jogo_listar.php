<?php

require "banco.php" ;

 $sql = "select * from  novatabeladois order by  jogo" ;

$qry = $con->prepare($sql);

$qry->execute();

$registros = $qry->fetchAll(PDO::FETCH_OBJ);

echo json_encode($registros);
?>