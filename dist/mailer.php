<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// use PHPMailer\PHPMailer\POP3;
// use PHPMailer\PHPMailer\OAuth;

//Load Composer's autoloader
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// require 'PHPMailer/src/POP3.php';
// require 'PHPMailer/src/OAuth.php';    



//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$name = $_POST['name'];
$text = $_POST['text'];
$email = $_POST['email'];

header('Content-type: text/html; charset=utf-8');
try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.mail.ru';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'eirih.yan@mail.ru';                     //SMTP username
    $mail->Password   = '2kFDihUunYsDR9GdZ5qT';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->setLanguage("ru");
    $mail->CharSet = "utf-8";
    //Recipients
    $mail->setFrom('eirih.yan@mail.ru', 'Log Formata mail sender');
    $mail->addAddress('kusochek.humora@gmail.com');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Заявка для поулчения подробной информации. Log Formata';
    $mail->Body    = '
    <table style="  width: 500px;
    border-collapse: collapse;
    border-spacing: 0;
    height: auto;">
        <tbody>
            <tr>
                <td style="   min-height: 35px;
                padding: 3px;
                width: 30px;
                height: 35px; background-color: #f8f8f8;
            transition: 0.3s all;
            border: black 1px solid;">Имя клиента</td>
                <td style="    min-height: 35px;
                padding: 3px;
                width: 30px;
                height: 35px; background-color: #f8f8f8;
            transition: 0.3s all;
            border: black 1px solid;">' .  $name . '</td>
            </tr>
            
			<tr>
			<td style="   min-height: 35px;
			padding: 3px;
			width: 30px;
			height: 35px; background-color: #f8f8f8;
		transition: 0.3s all;
		border: black 1px solid;">Почта клиента</td>
			<td style="   min-height: 35px;
			padding: 3px;
			width: 30px;
			height: 35px; background-color: #f8f8f8;
		transition: 0.3s all;
		border: black 1px solid;">' .  $email  . '</td>
		</tr>
        <td style="   min-height: 35px;
        padding: 3px;
        width: 30px;
        height: 35px; background-color: #f8f8f8;
    transition: 0.3s all;
    border: black 1px solid;">Сообщение клиента</td>
        <td style="   min-height: 35px;
        padding: 3px;
        width: 30px;
        height: 35px; background-color: #f8f8f8;
    transition: 0.3s all;
    border: black 1px solid;">' .  $text . '</td>
    </tr>
        </tbody>
    </table>';


    $mail->AltBody = 'Клиент' . $name . 'хочет получить консультацию.' . '\\n Отправьте ответ на почту:' . $email;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
