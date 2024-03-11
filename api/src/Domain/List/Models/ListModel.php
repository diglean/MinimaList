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
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel query()
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
