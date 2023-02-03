<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $with = ['user'];

    protected $casts = [
        'created_at' => 'date: d M Y',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d F Y');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
