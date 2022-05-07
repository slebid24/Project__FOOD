<?php
$_POST = json_decode(file_get_contents("php://input", true));
// нужно, что бы пиечпи принимал джейсон данные
echo var_dump($_POST);
// превращает данные с клиента в строку