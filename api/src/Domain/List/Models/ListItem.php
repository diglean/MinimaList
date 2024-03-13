<?php

namespace Domain\List\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $items
 * @property string $comment
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereItems($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ListItem whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ListItem extends Model
{
  public $table = "list_items";

  use HasFactory;

  protected $fillable = [
    'items',
    'comment',
    'created_at',
    'updated_at',
  ];
}