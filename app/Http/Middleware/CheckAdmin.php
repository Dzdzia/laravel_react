<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle($request, Closure $next)
    {
        if (auth()->user() &&  auth()->user()->role == 'admin') {
            return $next($request);
        }

        return redirect('users'); // przekieruj użytkowników, którzy nie są adminem
    }

}
