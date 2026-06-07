<?php
$config = file_get_contents(__DIR__ . '/js/site-config.js');
preg_match('/email:\s*"([^"]+)"/', $config, $emailMatch);
preg_match('/companyName:\s*"([^"]+)"/', $config, $companyMatch);
$to = $emailMatch[1] ?? 'hello@example.com';
$company = $companyMatch[1] ?? 'Website';
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');
$body = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\n\n$message\n";
$headers = "From: $company <no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . ">\r\n";
if ($email) {
  $headers .= "Reply-To: $email\r\n";
}
@mail($to, "New flooring inquiry", $body, $headers);
header('Location: contact.html?sent=1');
exit;
