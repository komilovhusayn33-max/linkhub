$port = 8080
$root = "d:\Documents\husan-ali-portfolio"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Host "Server started on http://localhost:$port/"
} catch {
    Write-Error "Failed to start server: $_"
    exit 1
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath.Replace("/", "\")
        $localPath = Join-Path $root $urlPath
        
        if ($localPath.EndsWith("\")) {
            $localPath = Join-Path $localPath "index.html"
        }
        
        if (Test-Path $localPath -PathType Leaf) {
            $buffer = [System.IO.File]::ReadAllBytes($localPath)
            
            # Simple mime types
            if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($localPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($localPath.EndsWith(".png")) { $response.ContentType = "image/png" }

            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # Ignore errors from closed connections
    }
}
