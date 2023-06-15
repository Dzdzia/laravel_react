Aplikacja oparta na Laravel/React
Do wysyłania asynchronicznych żądań wykorzystano axios
Walidacja po stronie klienta wykonana przy pomocy standardowych funkcji JS oraz 
hooków Reacta
Validacja po stronie serwera wykorzystuje mechanizm midleware Laravela
Model logowania aplikacji oparty jest na wbudowanym mechanizmie Laravela 
Sanctum ,który umożliwia wykorzystanie Tokenów. Jest to w praktyce model JWT.

## Instalacja
(przesłany plik jest kopią pobraną z systemu kontroli wersji git, 
dlatego nie zawiera plików vendor i node_modules(dodatkowo redukcja wagi pliku))
1. Sklonuj repozytorium do folderu htdocs xammppa
2. Zainstaluj zależności composerem i npx poprzez uruchomienie komendy `composer install && npm install && npm run dev`
3. Skonfiguruj plik .env poprzez skopiowanie .env.example .env
4. Wygeneruj klucz aplikacji poprzez komendę `php artisan key:generate`
5. Wykonaj migracje poprzez komendę `php artisan migrate`
6. Uruchom serwer poprzez komendę `php artisan serve --port=3000`
7. Uruchom serwer frontendowy poprzez komendę `npx vite build | npx vite
8. Aplikacja dostępna jest pod adresem http://localhost:3000
