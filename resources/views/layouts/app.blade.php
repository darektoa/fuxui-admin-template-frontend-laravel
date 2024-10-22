<!DOCTYPE html>

<html data-theme="light">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ $setting->appName }}</title>
        <link rel="icon" href="{{ $setting->logoUri }}">
        @vite(['resources/css/app.css', 'resources/js/App.jsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
