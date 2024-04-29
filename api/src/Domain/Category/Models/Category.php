<?php

namespace Domain\Category\Models;

use Illuminate\Database\Eloquent\Model;

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