<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
	
	protected $table = 'shops';
    
	protected $primaryKey = 'shop_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_name', 'shop_category', 'shop_location','shop_lat','shop_lon','shop_owner','create_at'
    ];

  

}
