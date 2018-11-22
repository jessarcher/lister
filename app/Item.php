<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Item extends Model
{
    protected $fillable = [
        'name',
        'order',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'completed_at',
        'completed_by',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $model->uuid = (string) Uuid::generate(4);
        });
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * Is the item complete?
     *
     * @return bool
     */
    public function isComplete(): bool
    {
        return ! empty($this->completed_at);
    }
}