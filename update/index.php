<?php
// filepath: /var/www/website/update/index.php

echo "<h1>Started update at " . date('Y-m-d H:i:s') . "</h1>";

$repository_path = '/var/www/website';
$ubri_path = '/var/www/website/urbi';

// Load .env file
$env_path = __DIR__ . '/.env';
if (file_exists($env_path)) {
    $lines = file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

$secret = $_ENV['SECRET_TOKEN'] ?? '';

if (!isset($_GET['token']) || $_GET['token'] !== $secret) {
    http_response_code(403);
    echo "Forbidden. You need to provide the right token";
    exit;
}
else {
    echo "Token is valid. Proceeding with update.";
}

echo "<h1>Git pull</h1><pre><code>";
echo "$ git -C $repository_path fetch\n";
system("git -C $repository_path fetch 2>&1");

echo "$ git -C $repository_path checkout origin/main\n";
system("git -C $repository_path checkout origin/main 2>&1");
echo "</code></pre>";

echo "<h1>Hugo build</h1><pre><code>";
echo "$ hugo --source $ubri_path  --destination $ubri_path /public\n";
system("cd $ubri_path && hugo ");
echo "</code></pre>";
?>