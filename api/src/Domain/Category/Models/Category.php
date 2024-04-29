<?php

namespace Domain\Category\Models;

use App\Context\Category\Types\CategoryActiveType;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nome
 * @property CategoryActiveType $active
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereNome($value)
 * @mixin \Eloquent
 */
class Category extends Model
{
	public $table = 'category';

	protected $fillable = [
		'name',
		'active',
	];

	protected $casts = [
		'active' => CategoryActiveType::class
	];
}