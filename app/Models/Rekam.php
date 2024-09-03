<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekam extends Model
{
    use HasFactory;
    protected $fillable = [
        'pasien_id',
        'dx',
        'tx',
        'keterangan'
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }
}
