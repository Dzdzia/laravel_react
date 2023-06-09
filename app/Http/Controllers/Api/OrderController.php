<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Store a new order.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $orders = Order::with('user', 'product')->get();
        return OrderResource::collection($orders);
    }
}
