<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

/**
 *
 */
class OrderController extends Controller
{
    /**
     * Store a new order.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $order = new Order;
        $order->user_id = Auth::id();
        $order->product_id = $request->product_id;
        $order->quantity = $request->quantity;
        $order->date_ordered = now();
        // dodatkowe pola jak status, cena itp.
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'Zamówienie zostało złożone',
            'order' => $order
        ]);
    }

    /**
     * Get a list of all orders.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit', 10); // Ustaw domyślny limit na 10, jeśli nie jest podany.
        $orders = Order::with('user', 'product')->paginate($limit);
        return OrderResource::collection($orders);
    }
}
