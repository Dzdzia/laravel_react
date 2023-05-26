@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            @foreach ($products as $product)
                <div class="col">
                    <h2>{{ $product->name }}</h2>
                    <p>{{ $product->price }}</p>
                    @if ($product->quantity > 0)
                        <p>Dostępne: {{ $product->quantity }}</p>
                    @endif
                </div>
            @endforeach
        </div>
    </div>
@endsection
