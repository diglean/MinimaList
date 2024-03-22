<?php

namespace Domain\List\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 *
 *
 * @property int $id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int|null $items_id
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel query()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel whereItemsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ListModel extends Model
{
    public $table = 'list';

    use HasFactory;

    protected $fillable = [
        'name',
        'created_at',
        'updated_at',
    ];
}
