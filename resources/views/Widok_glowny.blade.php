<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel_react_project</title>

        <link href="{{ asset('public/js/css_public.css') }}" rel="stylesheet">
        @viteReactRefresh
        @vite(['resources/css/index.css','resources/js/main.jsx'])

    </head>



    <body class="antialiased">
    <div id="root"></div>
    <script src="{{ asset('public/js/app_public.js') }}"></script>


    </body>
</html>


