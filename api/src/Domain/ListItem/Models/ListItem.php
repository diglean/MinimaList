<?php

namespace Domain\ListItem\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Context\ListItem\Types\ListItemUnitType;
use App\Context\ListItem\Types\ListItemActiveType;
use Illuminate\Support\Carbon;

/**
 * 
 * @property int $id
 * @property int $list_id
 * @property string $name
 * @property float|null $price
 * @property int|null $qty
 * @property float|null $total
 * @property int $category_id
 * @property ListItemActiveType $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property ListItemUnitType $unit
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ListItem extends Model
{
    public $table = 'list_item';

    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'unit' => ListItemUnitType::class,
        'active' => ListItemActiveType::class,
        'created_at' => 'date:Y-m-d H:i:s',
        'updated_at' => 'date:Y-m-d H:i:s',
    ];
}
