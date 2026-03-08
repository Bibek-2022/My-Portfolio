<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please complete all required fields.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

$to = 'shresthabibek2022@gmail.com';
$subject = 'New portfolio contact message from ' . $name;

$cleanName = str_replace(["\r", "\n"], '', $name);
$cleanEmail = str_replace(["\r", "\n"], '', $email);

$body = "You received a new portfolio contact message.\n\n"
    . "Name: {$cleanName}\n"
    . "Email: {$cleanEmail}\n\n"
    . "Message:\n{$message}\n";

$headers = "From: {$cleanName} <{$cleanEmail}>\r\n"
    . "Reply-To: {$cleanEmail}\r\n"
    . "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Message could not be sent right now. Please email me directly at shresthabibek2022@gmail.com.'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thanks! Your message was sent successfully. I will get back to you soon.'
]);
