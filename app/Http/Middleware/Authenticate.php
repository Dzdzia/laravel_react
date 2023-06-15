<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if ($request->expectsJson()) {
            return null;
        }

        if ($request->is('api/*')) {
            // Przekieruj na inną trasę API
            return route('api.default');
        }

        // Przekieruj na inną trasę, np. stronę logowania
        return route('login');
    }
}
