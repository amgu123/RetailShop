<?php

namespace App\Http\Controllers\Shops;
use Illuminate\Http\Request;
use App\Shop;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Validator, DateTime, DB, Hash, File, Config, Helpers, Helper;
class ShopController  extends Controller{

	public function index(Request $request){
		
	}
	
	
	// This function used to validate the shop data at server side
		 
	public function rules(){
        return array(
            'shpNme' => 'required|max:255',
            'shpCtg' => 'required|string|max:255',
			'shpAdr' => 'required',
			'shpLat' => 'required',
			'shpLon' => 'required',
			'shpOwn' => 'required|max:255',
        );
    }


    // Dashboard function , to get the count of all types of shops
    
	public function dashboard(Request $request){
			$user_info = Shop::select('shop_category', DB::raw('count(*) as total'))
                 ->groupBy('shop_category')
                 ->get();
	
		return response()->json(['status'=>true,'message'=>"OK",'response'=>['shops_count'=>$user_info]],200);
	
	}

	//function to insert shop data in database
	
	 public function insertShop(Request $request){
		
	 $validation = Validator::make($request->all(), self::rules());
		
		if(!$validation->passes()){
		    
		    return response()->json(['status'=>false,'message'=>$validation->getMessageBag()->first(),'response'=>[]],200);
		    
		}else{
		    
		    	$user = Shop::create([
					'shop_name'    => $request->shpNme,
					'shop_category' => $request->shpCtg,
					'shop_location' => $request->shpAdr,
					'shop_lat' => $request->shpLat,
					'shop_lon' => $request->shpLon,
					'shop_owner' => $request->shpOwn
				 ]);
				 
				return response()->json(['status'=>true,'message'=>'Shop added successfully','response'=>[]],200);

		}
    }
    
    
    // function to search shop on the basis of name and location
    public function searchShop(Request $request){
    
      
        if (!isset($request->shpName)) {
            $shpName = '';
        }else{
            $shpName = $request->shpName;
        }
        if (!isset($request->shpLat)) {
            $shpLat = '28.7041';
        }else{
            $shpLat = $request->shpLat;
        }
        if (!isset($request->shpLon)) {
            $shpLon = '77.1025';
        }else{
            $shpLon = $request->shpLon;
        }
    
        
        $shopList = Shop::select('shops.*',DB::raw("( 6371 * acos( cos( radians($shpLat) ) 
                * cos( radians( shop_lat ) ) 
                * cos( radians( shop_lon ) - radians($shpLon) ) + sin( radians($shpLat) ) 
                * sin( radians( shop_lat ) ) ) ) 
                AS distance"))
        ->where('shop_name', 'like', '%'.$shpName.'%')
        ->orderBy('distance', 'desc')
        ->get();
        
        
         return response()->json(['status'=>true,'message'=>'Shops','response'=>['shops'=>$shopList]],200);
        
    }
    
    
    
	
}



?>