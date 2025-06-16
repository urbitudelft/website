<?php
// filepath: /var/www/website/update/index.php

$repository_path = '/var/www/website';

// Only allow requests from localhost for security
if ($_SERVER['REMOTE_ADDR'] !== '127.0.0.1') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

echo "<h1>Git pull</h1><pre><code>";
echo "$ git -C $repository_path fetch\n";
system("git -C $repository_path fetch 2>&1");

echo "$ git -C $repository_path checkout origin/main\n";
system("git -C $repository_path checkout origin/main 2>&1");
echo "</code></pre>";

echo "<h1>Hugo build</h1><pre><code>";
echo "$ hugo --source $repository_path --destination $repository_path/public\n";
system("hugo --source $repository_path --destination $repository_path/public 2>&1");
echo "</code></pre>";
?>