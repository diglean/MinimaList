<?php

namespace Domain\List\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Context\List\Types\ListActiveType;
use Illuminate\Support\Carbon;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property int|null $items_id
 * @property int|null $items_qty
 * @property int $user_id
 * @property ListActiveType $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Lists newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lists newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lists query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereItemsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereItemsQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lists whereUserId($value)
 * @mixin \Eloquent
 */
class Lists extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'active',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'active' => ListActiveType::class,
        'created_at' => 'date:Y-m-d H:i:s',
        'updated_at' => 'date:Y-m-d H:i:s',
    ];
}
