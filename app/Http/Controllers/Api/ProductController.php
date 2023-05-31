<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use http\Client\Response;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return ProductResource::collection($products);
    }

public function store(StoreProductRequest $request)
{
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $product = Product::create($request->validated());
        return response()->json(['data' => $product], 201);
    }
}

    public function update(UpdateProductRequest $request, Product $product): \Illuminate\Http\JsonResponse
    {
        $product->update($request->validated());
        return response()->json(['data' => $product]);
    }

    public
    function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}

