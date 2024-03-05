<?php

namespace Domain\List\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $created_at
 * @property string $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListModel query()
 * @mixin \Eloquent
 */
class ListModel extends Model
{
    use HasFactory;
}
