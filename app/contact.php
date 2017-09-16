<?php

$post = (!empty($_POST)) ? true : false;

if($post)
{

$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$theme = htmlspecialchars($_POST['theme']);
$text = htmlspecialchars($_POST['message']);
$error = '';

if(!$name AND !$email AND !$text){
	$error .= 'Пожалуйста, заполните все обязательные поля.<br>';
}

if(!$error)

if(!$name)
{
$error .= 'Пожалуйста введите ваше имя.<br>';
}
elseif (strlen($name) < 3 || strlen($name) > 15) {
	$error .= 'Имя не может содержать меньше 5 и больше 15 символов.<br>';
}

if(!$error)

if(!$email)
{
$error .= 'Пожалуйста введите Ваш E-mail.<br>';
}
elseif(!preg_match("/^[-+\\.0-9=a-z_]+@([-0-9a-z]+\\.)+([0-9a-z]){2,4}$/i", $email))
{
$error .= 'Пожалуйста введите корректный E-mail.<br>';
}
elseif (strlen($email) < 5 || strlen($email) >20) {
	$error .= 'E-mail не может содержать меньше 5 и больше 20 символов.<br>';
}



//Проверка телефона
/*function ValidateTel($valueTel)
{
$regexTel = "/^[0-9]{7,12}$/";
if($valueTel == "") {
return false;
} else {
$string = preg_replace($regexTel, "", $valueTel);
}
return empty($string) ? true : false;
}
if(!$tel)
{
$error .= "Пожалуйста введите телефон.<br />";
}
if($tel && !ValidateTel($tel))
{
$error .= "Введите корректный телефон.<br />";
}*/
if(!$error)

// Проверка сообщения (length)
if(!$text || strlen($text) < 1)
{
$error .= "Введите ваше сообщение.<br />";// В этой строчке ставиться минимальное ограничение на написание букв.
}
elseif (strlen($text) > 200 || strlen($text) < 15) {

$error .= "Сообщение должно содержать не менее 15 и не более 200 символов.<br />";// В этой строчке ставиться минимальное ограничение на написание букв.
}


if(!$error)
{

$to = "shefpovar@inbox.ru";
$header = "Сообщение с сайта \"300pixels\"";
$subject = "=?utf-8?B?".base64_encode($header)."?=";
$message = "Имя: $name\r\n".
						"E-mail: $email\r\n".
						"Тема: $theme\r\n".
						"Сообщение: $text\r\n";
$headers = "From: $to\r\n".
						"Reply-to: $email\r\n".
						"Content-type: text/plain; charset=utf-8\r\n".
						"X-Mailer: PHP/". phpversion();





$mail = mail($to, $subject, $message, $headers);


if($mail)
{
echo 'OK';
}

}
else
{
echo '<div class="notification_error">'.$error.'</div>';
}

}
?>