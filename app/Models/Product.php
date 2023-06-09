<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $incrementing = true;
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'quantity',
        'description'
    ];
    public function orders()
    {
        return $this->belongsToMany('App\Models\Order');
    }
}
