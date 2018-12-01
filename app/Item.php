<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Item extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
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

    /**
     * Mark the item complete
     *
     * @param User $by
     *
     * @return Item
     */
    public function completeBy(User $by): Item
    {
        $this->completed_at = Carbon::now();
        $this->completed_by = $by->getKey();

        return $this;
    }

    /**
     * Mark the item incomplete
     *
     * @return Item
     */
    public function incomplete(): Item
    {
        $this->completed_at = null;
        $this->completed_by = null;

        return $this;
    }

    /**
     * The list that this item belongs to
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function list()
    {
        return $this->belongsTo(ItemList::class, 'list_id');
    }
}
