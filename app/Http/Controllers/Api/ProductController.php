<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
public function index()
{
$products = Product::all();
return response()->json(['data' => $products]);
}

public function store(StoreProductRequest $request)
{
$product = Product::create($request->validated());
return response()->json(['data' => $product], 201);
}

public function update(UpdateProductRequest $request, Product $product)
{
$product->update($request->validated());
return response()->json(['data' => $product]);
}

public function destroy(Product $product)
{
$product->delete();
return response()->json(null, 204);
}
}
